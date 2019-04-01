import React, { Component } from 'react';
import styled from 'styled-components';
import Search from '../../pages/Search/Search';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { provider, auth } from '../../client';
import logo from './logo.png';
import {
	loginInit,
	loginMiddleware,
	loginSuccess,
	loginFail,
	logout
} from '../../store/actions/actions';
const Navbar = styled.section`
	background-color: #0a1016;
	position: fixed;
	top: 0;
	width: 100%;
	padding: 1em;
	box-sizing: border-box;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
	z-index: 999;
	box-sizing: border-box;
`;
const Container = styled.div`
	width: 85%;
	margin: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Actions = styled.div`
	display: flex;
	align-items: center;
`;
const Action = styled.div`
	display: flex;
	align-items: center;
	margin-right: ${props => (props.last ? '0px' : '20px')};
`;
const Logo = styled.img`
	display: block;
	width: 30%;
	position: relative;
	top: 3px;
	@media (max-width: 730px) {
		width: 25%;
	}
`;
const Avatar = styled.img`
	border-radius: 50%;
	width: 30%;
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
export class MobileTopBar extends Component {
	state = {
		isSearchOpen: false
	};
	componentDidMount() {
		this.props.loginInit();
		let userName, email, imageUrl, authToken, userId, accessToken;
		userName = localStorage.getItem('userName');
		email = localStorage.getItem('email');
		imageUrl = localStorage.getItem('imageUrl');
		authToken = localStorage.getItem('authToken');
		userId = localStorage.getItem('userId');
		accessToken = localStorage.getItem('accessToken');
		const finalPayload = {
			userName,
			email,
			imageUrl,
			authToken,
			userId,
			accessToken
		};
		// console.log(userId, userName, email, imageUrl, authToken);
		if (userName && userId && authToken && imageUrl) {
			this.props.loginSuccess(finalPayload);
		} else {
			this.props.loginFail();
			this.props.logout();
		}
	}
	handleSearchPageClose = () => {
		this.setState(state => {
			return {
				isSearchOpen: !state.isSearchOpen
			};
		});
	};
	handlelogout = async () => {
		localStorage.removeItem('userName');
		localStorage.removeItem('phone');
		localStorage.removeItem('email');
		localStorage.removeItem('photoUrl');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('userId');
		await auth().signOut();
		this.props.logout();
	};
	handlelogin = async () => {
		this.props.loginInit();
		let userName, phone, email, photoUrl, accessToken, userId;
		try {
			let response = await auth().signInWithPopup(provider);
			console.log(response);
			if (response.user) {
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
			}
		} catch (err) {
			this.props.loginFail();
			alert(err);
		}
	};
	render() {
		let userDetails = this.props.view.isDesktop ? (
			<Link to={`/profile/${this.props.auth.userId}`}>
				<Actions>
					<Action>
						<p>{this.props.auth.userName.split(' ')[0]}</p>
					</Action>
					<Action>
						<Avatar src={this.props.auth.imageUrl} />
					</Action>
					{/* <Action>
				<button onClick={this.handlelogout}>logout</button>
			</Action> */}
				</Actions>
			</Link>
		) : null;
		return (
			<div>
				<Navbar>
					<Container>
						<Link to="/" style={{ color: '#e2e2e2' }}>
							<Logo src={logo} />
						</Link>
						<Actions>
							{this.props.view.isMobile ? null : (
								<React.Fragment>
									<Action>
										<Link to="/">Home</Link>
									</Action>
								</React.Fragment>
							)}
							<Action
								onClick={() =>
									this.setState(state => {
										return {
											isSearchOpen: !state.isSearchOpen
										};
									})
								}
								style={{ cursor: 'pointer' }}
								className="desc_search_role"
							>
								<i className="material-icons">search</i>
								{this.props.view.isDesktop ? <p>Search</p> : null}
							</Action>
							{this.props.auth.isLoggedIn ? (
								userDetails
							) : this.props.view.isDesktop ? (
								<Action>
									<FacebookButton onClick={this.handlelogin}>
										Login with Facebook
									</FacebookButton>
								</Action>
							) : null}
						</Actions>
					</Container>
				</Navbar>
				{this.state.isSearchOpen && (
					<Search closeSearch={this.handleSearchPageClose} />
				)}
			</div>
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
)(MobileTopBar);
