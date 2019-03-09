import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import MovieSection from '../../components/MovieSection/MovieSection';
import styled from 'styled-components';

const MovieSectionContainerSkeleton = styled.section`
	display: flex;
	flex-direction: column;
`;
const Container = styled.section`
	padding: 0.5em;
`;
const PosterSkeleton = styled.div`
	width: 500px;
	margin-right: 10px;
	border-radius: 10px;
	background-color: #223241;
	height: 130px;
`;
const Scroller = styled.section`
	display: flex;
	overflow: auto;
	margin-bottom: 2em;
`;
const Home = () => {
	const [loading, setLoading] = useState(true);
	const [movieData, setMovieData] = useState({
		blockBusterMovies: [],
		blockBusterSeries: [],
		comedy: [],
		justArrived: []
	});

	const fetchData = async () => {
		let res = await axios.get('/home-page');
		let data = res.data;
		if (data) {
			setLoading(false);
			setMovieData({
				blockBusterMovies: data.blockbuster_movies,
				blockBusterSeries: data.blockbuster_series,
				comedy: data.comedy,
				justArrived: data.just_arrived
			});
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const renderSkeletons = num => {
		let arr = [];
		let skeleton = <PosterSkeleton />;
		for (let i = 0; i < num; i++) {
			arr.push(skeleton);
		}
		return arr;
	};

	let posterSkeleton = renderSkeletons(4);
	return (
		<div>
			{loading ? (
				<Container>
					<MovieSectionContainerSkeleton>
						<Scroller>{posterSkeleton}</Scroller>
						<Scroller>{posterSkeleton}</Scroller>
						<Scroller>{posterSkeleton}</Scroller>
						<Scroller>{posterSkeleton}</Scroller>
					</MovieSectionContainerSkeleton>
				</Container>
			) : (
				<MovieSection movieData={movieData} />
			)}
		</div>
	);
};

export default Home;
