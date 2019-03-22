import React, { Component } from 'react';
import { provider, auth } from '../../client';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import {
	loginInit,
	loginMiddleware,
	loginSuccess,
	loginFail,
	logout
} from '../../store/actions/actions';
const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 80vh;
	flex-direction: column;
`;
const FacebookButton = styled.button`
	cursor: pointer;
	padding: 1em;
	background-color: #2f477a;
	border: none;
	color: #e2e2e2;
	font-weight: bold;
	border-radius: 4px;
`;
export class MobileLogin extends Component {
	state = {
		redirect: false,
		interval: null
	};
	handlelogout = async () => {
		localStorage.clear();
		await auth().signOut();
		this.props.logout();
	};
	handlelogin = async () => {
		this.props.loginInit();
		let userName, phone, email, photoUrl, accessToken, userId;
		try {
			let response = await auth().signInWithPopup(provider);
			if (response.user) {
				console.log(response);
				let data = response.user;
				accessToken = response.credential.accessToken;
				userName = data.displayName;
				phone = data.phoneNumber;
				email = data.email;
				photoUrl = response.additionalUserInfo.profile.picture.data.url;
				userId = response.additionalUserInfo.profile.id;
				const payload = {
					userName,
					imageUrl: photoUrl,
					phone: phone,
					email,
					accessToken,
					userId
				};
				this.props.loginMiddleware(payload);
				this.state.interval = setInterval(() => {
					if (this.props.auth.userId) {
						this.setState({ redirect: true });
					}
				}, 1000);
			}
		} catch (err) {
			this.props.loginFail();
			alert(err);
		}
	};
	componentWillUnmount() {
		clearInterval(this.state.interval, null);
	}
	render() {
		let redirect = this.state.redirect ? (
			<Redirect to={`/profile/${this.props.auth.userId}`} />
		) : null;
		return (
			<Container>
				{redirect}
				<h2 style={{ margin: '1em' }}>Please Login to Continue</h2>
				<FacebookButton onClick={this.handlelogin}>
					Login With Facebook
				</FacebookButton>
			</Container>
		);
	}
}
const mapStateToProps = state => {
	return {
		view: state.screenView,
		auth: state.auth
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loginInit: () => dispatch(loginInit()),
		loginMiddleware: payload => dispatch(loginMiddleware({ payload })),
		loginSuccess: payload => dispatch(loginSuccess({ ...payload })),
		loginFail: () => dispatch(loginFail()),
		logout: () => dispatch(logout())
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MobileLogin);
