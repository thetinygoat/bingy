import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import styled from 'styled-components';
import Offers from '../../components/Offers/Offers';
import rotten from './rotten.png';
import imdb from './imdb.png';

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
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;
const Poster = styled.img`
	border-radius: 10px;
	margin: 0.5em;
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
	padding: 1.5em;
`;
const Ratings = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const RatingProvider = styled.img`
	height: 1.5em;
	margin: 0.5em;
`;
const RatingContainer = styled.span`
	display: flex;
	align-items: center;
`;
const Tags = styled.section`
	display: flex;
	padding: 1em;
	flex-wrap: wrap;
	justify-content: center;
`;
const Genre = styled.div`
	background: rgba(229, 229, 229, 0.15);
	padding: 0.5em;
	margin: 0.3em;
	border-radius: 100px;
	font-size: 0.85em;
	font-weight: bold;
	text-align: center;
`;
const OfferContainer = styled.section`
	display: flex;import Skeleton from 'react-loading-skeleton';
	flex-direction: column;
`;
const ListActions = styled.section`
	display: flex;
`;
const ListAction = styled.div`
	background: rgba(229, 229, 229, 0.15);
	display: flex;
	align-items: center;
	padding: 1em;
	margin: 0.4em;
	border-radius: 100px;
	font-size: 0.9em;
	width: 7.5em;
	justify-content: center;
	font-weight: bold;
`;
const Description = styled.section`
	text-align: left !important;
	padding: 1em;
`;
const Stats = styled.div`
	display: flex;
	align-items: center;
`;
const Stat = styled.div`
	display: flex;
	margin: 0.5em;
	justify-content: space-around;
	width: 6em;
	text-align: left;
`;
const Hr = styled.hr`
	margin: 0.5em 0;
`;
const PosterSkeleton = styled.div`
	height: 236px;
	width: 166px;
	background-color: #223241;
	margin-bottom: 0.5em;
	border-radius: 10px;
`;
const HeadingSkeleton = styled.div`
	background-color: #223241;
	width: 10em;
	height: 1.5em;
`;
const GenreSkeleton = styled.div`
	background-color: #223241;
	padding: 0.5em;
	margin: 0.3em;
	border-radius: 100px;
	width: 3em;
	height: 0.5em;
`;
const SubHeadingSkeleton = styled.div`
	background-color: #223241;
	width: 7em;
	height: 1em;
	margin-bottom: 0.5em;
`;
const OfferSkeleton = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 200px;
	background-color: #223241;
	margin: 0.3em;
`;
const OfferSkeletonContainer = styled.div`
	display: flex;
	overflow-x: auto;
	justify-content: flex-end;
	padding: 0.7em;
`;
const ParagraphSkeleton = styled.div`
	height: 0.5em;
	background-color: #223241;
	margin-bottom: 0.4em;
`;
const ListActionSkeleton = styled.div`
	background-color: #223241;
	padding: 1.3em;
	margin: 0.4em;
	border-radius: 100px;
	font-size: 0.9em;
	width: 7.5em;
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
	const [loading, setLoading] = useState(true);

	const fetchFullContentData = async () => {
		let res = await axios.post('/get-full-data', {
			unique_id: props.match.params.id
		});
		console.log(res.data);
		let imdbRating, tomatoRating;
		res.data.scoring.map(m => {
			if (m.provider_type === 'tomato:meter') tomatoRating = m.value;
			else if (m.provider_type === 'imdb:score') imdbRating = m.value;
		});
		setContentData({
			genres: res.data.genre_mapping,
			offers: res.data.offers,
			scoring: res.data.scoring,
			description: res.data.short_description,
			releaseYear: res.data.original_release_year,
			unique_id: res.data.unique_id,
			_id: res.data._id,
			poster: res.data.poster,
			title: res.data.title,
			runtime: res.data.runtime,
			imdbRating,
			tomatoRating
		});
		setLoading(false);
	};
	useEffect(() => {
		fetchFullContentData();
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
				<RatingProvider src={imdb} /> {contentData.imdbRating + '/10'}
			</RatingContainer>
		);
	}

	const renderSkeletons = (type, num) => {
		let arr = [];
		let skeletonType = null;
		switch (type) {
		case 'Genre':
			skeletonType = <GenreSkeleton />;
			break;
		case 'Offer':
			skeletonType = <OfferSkeleton />;
			break;
		case 'Para':
			skeletonType = <ParagraphSkeleton />;
			break;
		default:
			skeletonType = null;
		}
		for (let i = 0; i < num; i++) {
			arr.push(skeletonType);
		}
		return arr;
	};
	let genreSkeleton = renderSkeletons('Genre', 3);
	let offerSekeleton = renderSkeletons('Offer', 3);
	let paragraphSekeleton = renderSkeletons('Para', 6);
	return (
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
				{loading ? <PosterSkeleton /> : <Poster src={contentData.poster} />}
				{loading ? <HeadingSkeleton /> : <Heading>{contentData.title}</Heading>}
				<Ratings>
					{tomatoRating}
					{imdbRating}
				</Ratings>
				<Tags>
					{loading
						? genreSkeleton
						: contentData.genres.slice(0, 3).map(genre => {
							return <Genre key={genre}>{genre}</Genre>;
						  })}
				</Tags>
				<OfferContainer>
					{loading ? null : <SubHeading>Stream It On</SubHeading>}
					{loading ? (
						<OfferSkeletonContainer>{offerSekeleton}</OfferSkeletonContainer>
					) : (
						<Offers offers={contentData.offers} />
					)}
				</OfferContainer>
				<ListActions>
					{loading ? (
						<ListActionSkeleton />
					) : (
						<ListAction>
							<i className="material-icons">add</i> Want To See
						</ListAction>
					)}
					{loading ? (
						<ListActionSkeleton />
					) : (
						<ListAction>
							<i className="material-icons">done</i>Seen It
						</ListAction>
					)}
				</ListActions>
				<Description>
					{loading ? (
						<SubHeadingSkeleton />
					) : (
						<SubHeading>Description</SubHeading>
					)}
					{loading ? (
						paragraphSekeleton
					) : (
						<p>
							{shortDescriptionState ? description : contentData.description}
						</p>
					)}
					{contentData.description.length > 140 ? (
						<p onClick={() => setShortDescriptionState(!shortDescriptionState)}>
							{shortDescriptionState ? 'more' : 'less'}
						</p>
					) : null}

					{loading ? null : <Hr />}
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
			</ContentContainer>
		</div>
	);
};

export default ContentPage;
