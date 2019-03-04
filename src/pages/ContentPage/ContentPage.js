import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import styled, { keyframes } from 'styled-components';
import Offers from '../../components/Offers/Offers';
import { Poster, Line, Title, Offer } from '../../components/Skeleton/Skeleton';
const Container = styled.section`
	display: flex;
	width: 80%;
	margin: 0 auto;
	justify-content: space-around;
	padding: 1em;
	color: #fff;
	@media (max-width: 769px) {
		flex-direction: column;
	}
`;
const MovieData = styled.section`
	display: flex;
	flex-direction: column;
	max-width: 70%;
	min-width: 70%;
	padding: 0.5em;
	@media (max-width: 769px) {
		justify-content: center;
		max-width: 100%;
		text-align: center;
	}
`;
const MoviePoster = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	padding: 0.5;
`;
const OfferSkeleton = styled.div`
	display: flex;
`;

const TitleSkeleton = styled.div`
	display: flex;
	@media (max-width: 769px) {
		justify-content: center;
	}
`;
const Stats = styled.p`
	color: grey;
	padding: 0.6em;
	font-size: 0.9em;
`;
const Description = styled.div`
	text-align: left;
`;
const ContentTitle = styled.h1`
	font-size: 2em;
`;
const SubHeading = styled.p`
	font-size: 1.3em;
	font-weight: bold;
	margin: 0.7em 0;
`;
const GenreContainer = styled.section`
	display: flex;
	padding: 0.6em;
	margin: 0.5em;
	// align-items: center;
	@media (max-width: 768px) {
		justify-content: center;
	}
`;
const Genre = styled.span`
display: flex;
align-items: center
	background-color: #00e27e;
	margin: 0 0.4em 0 0;
	color: #081118;
	padding: 0.45em;
	font-size: 0.8em;
	border-radius: 20px;
	font-weight: bold;
`;
const ContentPage = props => {
	const [contentData, setContentData] = useState({
		genres: [],
		offers: [],
		rating: 0,
		description: '',
		releaseYear: '',
		unique_id: '',
		_id: '',
		poster: '',
		title: '',
		runtime: ''
	});
	const [loading, setLoading] = useState(false);

	const fetchFullContentData = async () => {
		setLoading(true);
		let res = await axios.post('/get-full-data', {
			unique_id: props.match.params.id
		});
		console.log(res.data);
		setContentData({
			genres: res.data.genre_mapping,
			offers: res.data.offers,
			scoring: res.data.scoring[0],
			description: res.data.short_description,
			releaseYear: res.data.original_release_year,
			unique_id: res.data.unique_id,
			_id: res.data._id,
			poster: res.data.poster,
			title: res.data.title,
			runtime: res.data.runtime
		});
		setLoading(false);
	};
	useEffect(() => {
		fetchFullContentData();
	}, []);

	const [shortDescriptionState, setShortDescriptionState] = useState(true);
	let description;
	if (contentData.description.length > 140) {
		description = contentData.description.substring(0, 140) + '... ';
	} else description = contentData.description;
	let skeleton = (
		<Container bg={contentData.poster}>
			<MoviePoster>
				<Poster />
			</MoviePoster>
			<MovieData>
				<TitleSkeleton>
					<Title />
				</TitleSkeleton>
				<OfferSkeleton>
					<Offer />
					<Offer />
					<Offer />
				</OfferSkeleton>
				<Line length={5} />
				<Line length={7} />
				<Line length={10} />
			</MovieData>
		</Container>
	);
	let content = (
		<Container bg={contentData.poster}>
			<MoviePoster>
				<img src={contentData.poster} width="160px" height="236px" />
			</MoviePoster>
			<MovieData>
				<ContentTitle>{contentData.title}</ContentTitle>
				<GenreContainer>
					{contentData.genres.map(genre => {
						return <Genre key={genre}>{genre}</Genre>;
					})}
				</GenreContainer>
				<Offers offers={contentData.offers} />
				<Description>
					<SubHeading>Description</SubHeading>
					<p>{shortDescriptionState ? description : contentData.description}</p>
					{contentData.description.length > 140 ? (
						<span
							style={{ textDecoration: 'underline', cursor: 'pointer' }}
							onClick={() => {
								setShortDescriptionState(!shortDescriptionState);
							}}
						>
							read {shortDescriptionState ? 'more' : 'less'}
						</span>
					) : null}
				</Description>
			</MovieData>
		</Container>
	);
	return <div>{loading ? skeleton : content}</div>;
};

export default ContentPage;
