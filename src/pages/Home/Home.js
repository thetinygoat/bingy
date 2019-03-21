import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import MovieSection from '../../components/MovieSection/MovieSection';
import Slider from 'react-slick';
import styled from 'styled-components';
import Spinner from '../../components/Spinner/Spinner';

const SliderContainer = styled.section`
	width: 100%;
`;
const SliderPoster = styled.img`
	width: 100%;
	// height: 80vh;
	border-radius: 10px;
	@media (max-width: 730px) {
		transform: scale(0.9);
	}
`;
const Home = () => {
	const [loading, setLoading] = useState(true);
	const [movieData, setMovieData] = useState({
		blockBusterMovies: [],
		blockBusterSeries: [],
		comedy: [],
		justArrived: []
	});
	const [carousel, setCarousel] = useState([]);

	const fetchData = async () => {
		let res = await axios.get('/home-page');
		let data = res.data;
		console.log(data);
		if (data) {
			setLoading(false);
			setMovieData({
				blockBusterMovies: data.blockbuster_movies,
				blockBusterSeries: data.blockbuster_series,
				comedy: data.comedy,
				justArrived: data.just_arrived
			});
			setCarousel(data.corousel);
		}
	};
	useEffect(() => {
		fetchData();
		return () => {
			setLoading(true);
		};
	}, []);
	let settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 10000
	};

	return loading ? (
		<Spinner />
	) : (
		<div>
			<SliderContainer>
				<Slider {...settings}>
					{carousel.map(c => {
						return (
							<div key={c.unique_id}>
								<SliderPoster src={c.poster} />
							</div>
						);
					})}
				</Slider>
			</SliderContainer>
			<MovieSection movieData={movieData} />
		</div>
	);
};

export default Home;
