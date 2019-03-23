import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 80%;
	margin: auto;
	flex-direction: column;
	@media (max-width: 730px) {
		width: 100%;
	}
`;
const Cover = styled.img`
	width: 100%;
`;
const UserData = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
const AvatarContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	@media (max-width: 730px) {
		align-items: center;
		text-align: center;
	}
`;
const Avatar = styled.img`
	margin: 0 0 0 2em;
	position: relative;
	top: -4em;
	border-radius: 50%;
	@media (max-width: 730px) {
		margin: 0;
	}
`;
const Heading = styled.h1`
	font-size: 2em;
`;
const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	top: -2.5em;
	width: 100%;
`;
const Bio = styled.p`
	width: 100%;
	@media (max-width: 730px) {
		width: 80%;
		margin: auto;
	}
`;
const SubHeading = styled.h1`
	font-size: 1.3em;
	margin: 0.5em 0.5em 0.5em 0;
	@media (max-width: 730px) {
		margin: 0.5em;
	}
`;
// const Scroller = styled.div`
// 	display: flex;
// 	overflow: auto;
// `;
// const ScrollerContainer = styled.section`
// 	padding: 1em;
// 	display: flex;
// 	width: 90%;
// 	flex-direction: column;
// 	text-align: left !important;
// 	margin-top: 1em;
// 	@media (max-width: 730px) {
// 		width: 107%;
// 	}
// `;
// const ReccomendedPoster = styled.img`
// 	margin-right: 1.2em;
// 	border-radius: 4px;
// 	width: 150px;
// 	@media (max-width: 730px) {
// 		width: 120px;
// 	}
// `;
export class Profile extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<Container>
				<AvatarContainer>
					<Cover src="https://cdn.pixabay.com/photo/2015/11/19/08/52/banner-1050629_960_720.jpg" />
					<Avatar src={this.props.auth.imageUrl} />
					<UserInfo>
						<Heading>{this.props.auth.userName}</Heading>
						{/* <SubHeading>Rookie</SubHeading> */}
						<Bio />
					</UserInfo>
				</AvatarContainer>
				<UserData>
					<SubHeading>Wish List</SubHeading>
					<SubHeading>Watch List</SubHeading>
				</UserData>
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
export default connect(mapStateToProps)(Profile);
