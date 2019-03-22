import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import styled from 'styled-components';
import Offers from '../../components/Offers/Offers';
import rotten from './rotten.png';
import imdb from './imdb.png';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import ReactGA from 'react-ga';
const Bg = styled.div`
	height: 100vh;
	width: 100%;
	background-image: url(${props => props.bg});
	background-repeat: no-repeat;
	background-size: cover;
	position: fixed;
	z-index: -999;
	filter: blur(15px);
`;
const Gradient = styled.div`
	width: 100%;
	height: 100vh;
	background: linear-gradient(
		180deg,
		rgba(10, 14, 22, 0.67) 0%,
		#0a1016 99.45%
	);
	position: fixed;
	z-index: -999;
	top: 0;
`;
const ContentContainer = styled.section`
	display: flex;
	width: 85%;
	margin: auto;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
	@media (max-width: 730px) {
	}
`;
const Poster = styled.img`
	border-radius: 4px;
	box-shadow: inset 0 0 10px #000000;
`;
const Heading = styled.h1`
	font-size: 2em;
	text-align: center;
`;
const SubHeading = styled.h1`
	font-size: 1.3em;
	margin-bottom: 0.5em;
`;
const TopActions = styled.section`
	display: flex;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	padding: 2em 1em;
`;
const Ratings = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5em 0.5em 0.5em 0;
`;
const RatingProvider = styled.img`
	height: 1.5em;
	margin-right: 0.5em;
`;
const RatingContainer = styled.span`
	display: flex;
	align-items: center;
	margin-right: 0.5em;
`;
const Tags = styled.section`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 0.5em 0.5em 0.5em 0;
`;
const Genre = styled.div`
	background: rgba(229, 229, 229, 0.15);
	border-radius: 100px;
	font-size: 0.85em;
	font-weight: bold;
	text-align: center;
	padding: 0.6em;
	margin: 0.3em;
`;
const OfferContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	@media (max-width: 730px) {
		align-items: center;
	}
`;
const ListActions = styled.section`
	display: flex;
	padding: 1em 1em 1em 0;
	justify-content: center;
`;
const ListAction = styled.div`
	background: rgba(229, 229, 229, 0.15);
	display: flex;
	align-items: center;
	border-radius: 100px;
	font-size: 0.9em;
	width: 7.5em;
	justify-content: center;
	font-weight: bold;
	padding: 0.8em;
	margin-right: 0.5em;
`;
const Description = styled.section`
	text-align: left !important;
`;
const Stats = styled.div`
	display: flex;
	align-items: center;
`;
const Stat = styled.div`
	display: flex;
	justify-content: space-around;
	width: 6em;
	text-align: left;
`;
const Hr = styled.hr`
	margin: 1em 0;
`;
const PosterContainer = styled.div`
	display: flex;
	align-items: flex-start;
	width: 20%;
	margin: 0 auto;
	justify-content: flex-end;
	@media (max-width: 730px) {
		justify-content: center;
		padding: 0;
		margin-bottom: 0.5em;
	}
`;
const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width:70%
	margin:auto;
	align-items: flex-start;
	justify-content: center;
	box-sizing: border-box;
	@media (max-width: 730px) {
		align-items: center;
		padding: 0;
		width: 90%
	}
`;
const Layout = styled.div`
	display: flex;
	@media (max-width: 730px) {
		flex-direction: column;
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
		width: 107%;
	}
`;
const ReccomendedPoster = styled.img`
	margin-right: 1.2em;
	border-radius: 4px;
	width: 150px;
	@media (max-width: 730px) {
		width: 120px;
	}
`;
const Title = styled.p`
text-decoration: none;
color: #a4a6a7;
font-size: .8em;
margin-top: .2em
display: flex
flex-wrap:wrap
width: 90%
`;
const Holder = styled.div`
	// margin-right: 1.2em;
	border-radius: 4px;
	height: 213px;
	min-width: 150px;
	max-width: 150px;
	display: flex;
	text-align: center;
	background-color: #284058;
	justify-content: center;
	align-items: center;
	font-size: 0.8em;
	// @media (max-width: 730px) {
	// 	min-width: 120px;
	// 	max-width: 120px;
	// 	height: 170px;
	// }
	color: grey;
`;
const ContentPage = props => {
	const [contentData, setContentData] = useState({
		genres: [],
		offers: [],
		tomatoRating: 0,
		imdbRating: 0,
		description: '',
		releaseYear: '',
		unique_id: '',
		_id: '',
		poster: '',
		title: '',
		runtime: ''
	});
	const [reccomendations, setReccomendations] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchFullContentData = async () => {
		let res = await axios.post('/movie-page', {
			unique_id: props.match.params.id
		});
		let movieData = res.data.movie;
		let reccomendedData = res.data.reccomended_movies;
		let imdbRating, tomatoRating;
		movieData.scoring.map(m => {
			if (m.provider_type === 'tomato:meter') tomatoRating = m.value;
			else if (m.provider_type === 'imdb:score') imdbRating = m.value;
			return null;
		});
		setContentData({
			genres: movieData.genre_mapping,
			offers: movieData.offers,
			scoring: movieData.scoring,
			description: movieData.short_description,
			releaseYear: movieData.original_release_year,
			unique_id: movieData.unique_id,
			_id: movieData._id,
			poster: movieData.poster,
			title: movieData.title,
			runtime: movieData.runtime,
			imdbRating,
			tomatoRating
		});
		setReccomendations(reccomendedData);
		setLoading(false);
	};
	useEffect(() => {
		ReactGA.pageview(`/content/${props.match.params.id}`);
		window.scrollTo(0, 0);
		fetchFullContentData();
		return () => {
			setLoading(true);
		};
	}, [props.match.params.id]);

	const [shortDescriptionState, setShortDescriptionState] = useState(true);
	let description;
	if (contentData.description.length > 140) {
		description = contentData.description.substring(0, 140) + '....';
	} else description = contentData.description;

	let tomatoRating = null;
	if (!contentData.tomatoRating) {
		tomatoRating = null;
	} else {
		tomatoRating = (
			<RatingContainer>
				<RatingProvider src={rotten} /> {contentData.tomatoRating + '%'}
			</RatingContainer>
		);
	}
	let imdbRating = null;
	if (!contentData.imdbRating) {
		imdbRating = null;
	} else {
		imdbRating = (
			<RatingContainer>
				<RatingProvider src={imdb} />
				{contentData.imdbRating + '/10'}
			</RatingContainer>
		);
	}
	const constructPosterUrl = (query, title) => {
		const QUERY_ARRAY = query.split('/');
		const BASE_URL = 'https://images.justwatch.com';
		const TYPE = QUERY_ARRAY[1];
		const ID = QUERY_ARRAY[2];
		const RES = 's166';
		return `${BASE_URL}/${TYPE}/${ID}/${RES}/${title}`;
	};
	return loading ? (
		<Spinner />
	) : (
		<div>
			<Bg bg={contentData.poster} />
			<Gradient />
			<ContentContainer>
				<TopActions>
					<i
						className="material-icons"
						onClick={() => props.history.goBack()}
						style={{ cursor: 'pointer' }}
					>
						arrow_back
					</i>
					<i className="material-icons" style={{ cursor: 'pointer' }}>
						share
					</i>
				</TopActions>
				<Layout>
					<PosterContainer>
						{contentData.poster ? (
							<Poster
								src={contentData.poster}
								alt={contentData.title}
								key={contentData.poster}
							/>
						) : (
							<Holder>
								{contentData.title} ({contentData.releaseYear})
							</Holder>
						)}
					</PosterContainer>
					<InfoContainer>
						<Heading>{contentData.title}</Heading>
						<Ratings>
							{tomatoRating}
							{imdbRating}
						</Ratings>
						<Tags>
							{contentData.genres.slice(0, 3).map(genre => {
								return <Genre key={genre}>{genre}</Genre>;
							})}
						</Tags>
						<OfferContainer>
							<SubHeading>Stream It On</SubHeading>
							<Offers offers={contentData.offers} />
						</OfferContainer>
						<ListActions>
							<ListAction>
								<i className="material-icons">add</i> Want To See
							</ListAction>
							<ListAction>
								<i className="material-icons">done</i>Seen It
							</ListAction>
						</ListActions>
						<Description>
							<SubHeading>Description</SubHeading>
							{
								<p>
									{shortDescriptionState
										? description
										: contentData.description}
								</p>
							}
							{contentData.description.length > 140 ? (
								<p
									onClick={() =>
										setShortDescriptionState(!shortDescriptionState)
									}
								>
									{shortDescriptionState ? 'more' : 'less'}
								</p>
							) : null}
							<Hr />
							<Stats>
								<Stat>
									<i className="material-icons">access_time</i>{' '}
									{contentData.runtime}
								</Stat>
								<Stat>
									<i className="material-icons">calendar_today</i>{' '}
									{contentData.releaseYear}
								</Stat>
							</Stats>
						</Description>
					</InfoContainer>
				</Layout>
				<ScrollerContainer>
					<SubHeading>Watch Similar to {contentData.title}</SubHeading>
					<Scroller>
						{reccomendations.map(r => {
							let url;
							if (r.poster) {
								url = constructPosterUrl(r.poster, r.title);
							}
							return (
								<Link to={`/content/${r.unique_id}`} key={r.unique_id}>
									{r.poster ? (
										<ReccomendedPoster src={url} />
									) : (
										<Holder style={{ marginRight: '1.2em', height: '87%' }}>
											{r.title} ({r.original_release_year})
										</Holder>
									)}

									<Title>{r.title}</Title>
								</Link>
							);
						})}
					</Scroller>
				</ScrollerContainer>
			</ContentContainer>
		</div>
	);
};

export default ContentPage;
