import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './BottomBar.css';
const Bar = styled.section`
	background-color: #0a1016;
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	justify-content: space-around;
	box-shadow: 10px 10px 7px 10px #0a1016;
`;
const IconContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 0.75em;
	padding: 0.7em;
	color: grey;
`;
const IconDesc = styled.div`
	font-size: 0.8em;
`;

class BottomBar extends Component {
	state = {
		profileUrl: '',
		profileRedirect: null
	};
	componentDidMount() {
		if (this.props.auth.isLoggedIn && this.props.auth.userId) {
			let url = `/profile/${this.props.auth.userId}`;
			this.setState({ profileUrl: url });
		}
	}
	render() {
		return (
			<Bar className="IconColor">
				<IconContainer>
					<NavLink to="/">
						<i className="material-icons">home</i>
					</NavLink>
					<IconDesc>Home</IconDesc>
				</IconContainer>
				<IconContainer>
					<NavLink to="/">
						<i className="material-icons">movie</i>
					</NavLink>
					<IconDesc>Movies</IconDesc>
				</IconContainer>
				<IconContainer>
					<NavLink to="/">
						<i className="material-icons">tv</i>
					</NavLink>
					<IconDesc>Series</IconDesc>
				</IconContainer>
				<IconContainer>
					{this.props.auth.isLoggedIn && this.props.auth.userId ? (
						<NavLink to={`/profile/${this.props.auth.userId}`}>
							<i className="material-icons">face</i>
						</NavLink>
					) : (
						<NavLink to="/mobile/login">
							<i className="material-icons">face</i>
						</NavLink>
					)}
					<IconDesc>Profile</IconDesc>
				</IconContainer>
			</Bar>
		);
	}
}
const mapStateToProps = state => {
	return {
		view: state.screenView,
		auth: state.auth
	};
};
export default connect(mapStateToProps)(BottomBar);
