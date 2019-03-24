import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/actions';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../axios';
import { Poster } from '../../components/Poster';
import { Title } from '../../components/Typography';
import { DynamicHolder } from '../../components/Holder';
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
	margin-bottom: 0.5em;
	@media (max-width: 730px) {
		margin-bottom: 0;
	}
`;
const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	top: -2.5em;
	width: 100%;
	justify-content: center;
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
const Logout = styled.button`
	width: 20%;
	padding: 0.8em;
	border-radius: 4px;
	border: none;
	cursor: pointer;
	background-color: red;
	color: #fff;
	font-weight: bold;
	@media (max-width: 730px) {
		margin: 1em auto;
	}
`;
const Scroller = styled.div`
	display: flex;
	overflow: auto;
`;
const ScrollerContainer = styled.section`
	padding: 1em;
	display: flex;
	width: 90%;
	flex-direction: column;
	text-align: left !important;
	margin-top: 1em;
	@media (max-width: 730px) {
	}
`;
export class Profile extends Component {
	state = {
		wishList: [],
		watchList: []
	};
	async componentDidMount() {
		window.scrollTo(0, 0);
		let headers = {
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem('authToken')
		};
		let resp = await axios.get('/api/users/meta-data', { headers: headers });
		console.log(resp.data);
		this.setState({
			wishList: resp.data.wishlist,
			watchList: resp.data.watchlist
		});
	}
	constructPosterUrl = (query, title) => {
		const QUERY_ARRAY = query.split('/');
		const BASE_URL = 'https://images.justwatch.com';
		const TYPE = QUERY_ARRAY[1];
		const ID = QUERY_ARRAY[2];
		const RES = 's166';
		return `${BASE_URL}/${TYPE}/${ID}/${RES}/${title}`;
	};
	render() {
		return (
			<Container>
				<AvatarContainer>
					<Cover src="https://cdn.pixabay.com/photo/2015/11/19/08/52/banner-1050629_960_720.jpg" />
					<Avatar src={this.props.auth.imageUrl} />
					<UserInfo>
						<Heading>{this.props.auth.userName}</Heading>
						<Bio />
						{/* <Logout onClick={() => this.props.logout()}>Logout</Logout> */}
					</UserInfo>
				</AvatarContainer>
				<UserData>
					<ScrollerContainer>
						<SubHeading>Wish List</SubHeading>
						<Scroller>
							{this.state.wishList.map(movie => {
								let url;
								if (movie.poster) {
									url = this.constructPosterUrl(movie.poster, movie.title);
								}
								return (
									<Link
										to={`/content/${movie.unique_id}`}
										key={movie.unique_id}
									>
										{movie.poster ? (
											<Poster src={url} />
										) : (
											<DynamicHolder>
												{movie.title} ({movie.original_release_year})
											</DynamicHolder>
										)}

										<Title>
											{movie.title}({movie.original_release_year})
										</Title>
									</Link>
								);
							})}
						</Scroller>
					</ScrollerContainer>

					<ScrollerContainer>
						<SubHeading>Watch List</SubHeading>
						<Scroller>
							{this.state.watchList.map(movie => {
								let url;
								if (movie.poster) {
									url = this.constructPosterUrl(movie.poster, movie.title);
								}
								return (
									<Link
										to={`/content/${movie.unique_id}`}
										key={movie.unique_id}
									>
										{movie.poster ? (
											<Poster src={url} />
										) : (
											<DynamicHolder>
												{movie.title} ({movie.original_release_year})
											</DynamicHolder>
										)}

										<Title>
											{movie.title}({movie.original_release_year})
										</Title>
									</Link>
								);
							})}
						</Scroller>
					</ScrollerContainer>
				</UserData>
				{/* {this.props.auth.isLoggedIn && <Redirect to="/" />} */}
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
		logout: () => dispatch(logout())
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
