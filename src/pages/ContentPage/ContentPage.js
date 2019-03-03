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
	@media (max-width: 730px) {
		flex-direction: column;
	}
`;
const MovieData = styled.section`
	display: flex;
	flex-direction: column;
	max-width: 70%;
	min-width: 70%;
	@media (max-width: 730px) {
		justify-content: center;
		max-width: 100%;
		text-align: center;
	}
`;
const MoviePoster = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
`;
const OfferSkeleton = styled.div`
	display: flex;
`;

const TitleSkeleton = styled.div`
	display: flex;
	justify-content: center;
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
	const ContentTitle = styled.h1`
		font-size: 2em;
	`;
	const fetchFullContentData = async () => {
		setLoading(true);
		let res = await axios.post('/get-full-data', {
			unique_id: props.match.params.id
		});
		console.log(res.data);
		setContentData({
			genres: res.data.genere_mapping,
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
				<img src={contentData.poster} />
			</MoviePoster>
			<MovieData>
				<ContentTitle>{contentData.title}</ContentTitle>
				<p>
					{contentData.runtime} {contentData.releaseYear}
				</p>
				<Offers offers={contentData.offers} />
				<p>{shortDescriptionState ? description : contentData.description}</p>
				{}
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
			</MovieData>
		</Container>
	);
	return <div>{loading ? skeleton : content}</div>;
};

export default ContentPage;
