import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import MovieSection from '../../components/MovieSection/MovieSection';

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
	return (
		<div>
			<MovieSection movieData={movieData} />
		</div>
	);
};

export default Home;
