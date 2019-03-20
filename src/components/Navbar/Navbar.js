import React, { Component } from 'react';
import styled from 'styled-components';
import Search from '../../pages/Search/Search';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { setLogin, logout, initLogIn } from '../../store/actions/actions';
const Navbar = styled.section`
	background-color: #0a1016;
	position: fixed;
	top: 0;
	width: 100%;
	padding: 1em;
	box-sizing: border-box;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
	z-index: 999;
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
`;
const Action = styled.div`
	margin-right: ${props => (props.last ? '0px' : '20px')};
`;
export class MobileTopBar extends Component {
	state = {
		isSearchOpen: false
	};
	componentDidMount() {
		console.log('navbar mounted');
		let authToken = localStorage.getItem('authToken');
		let userId = localStorage.getItem('userId');
		let imageUrl = localStorage.getItem('imageUrl');
		let userName = localStorage.getItem('userName');
		const payload = {
			authToken,
			userId,
			imageUrl,
			userName
		};
		if (userName && userId && imageUrl && authToken) {
			this.props.handleLogIn(payload);
		}
	}
	handleSearchPageClose = () => {
		this.setState(state => {
			return {
				isSearchOpen: !state.isSearchOpen
			};
		});
	};
	handleFbClick = () => {
		console.log('clicked');
	};
	handleResponse = response => {
		console.log(response);
		this.props.initLogIn(response);
	};
	render() {
		let userDetails = (
			<div>
				<p>{this.props.auth.userName}</p>
			</div>
		);
		return (
			<div>
				<Navbar>
					<Container>
						<Link to="/" style={{ color: '#e2e2e2' }}>
							<h1>Bingy</h1>
						</Link>
						<Actions>
							<Action
								onClick={() =>
									this.setState(state => {
										return {
											isSearchOpen: !state.isSearchOpen
										};
									})
								}
							>
								<i className="material-icons">search</i>
							</Action>
							<Action last>
								<i className="material-icons">settings</i>
							</Action>
						</Actions>
						{!this.props.auth.isLoggedIn ? (
							<FacebookLogin
								appId="1195825920574651"
								fields="name, email, picture"
								scope="public_profile,user_friends"
								onClick={this.props.handleLogIn}
								callback={this.handleResponse}
								// disableMobileRedirect={true}
							/>
						) : (
							userDetails
						)}
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
		initLogIn: payload => dispatch(initLogIn({ payload: payload })),
		handleLogIn: payload => dispatch(setLogin({ payload: payload })),
		handleLogout: () => dispatch(logout())
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MobileTopBar);
