import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import MovieSection from '../../components/MovieSection/MovieSection';
import Slider from 'react-slick';
import styled from 'styled-components';
import Spinner from '../../components/Spinner/Spinner';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
const Hoc = props => {
	return props.children;
};
const Home = props => {
	const [loading, setLoading] = useState(true);
	const [movieData, setMovieData] = useState([]);
	const [carousel, setCarousel] = useState([]);
	const fetchData = async () => {
		let res = await axios.get('/home-page2');
		let data = res.data;
		let finalData = Object.keys(data)
			.filter(key => {
				return key !== 'corousel';
			})
			.map(key => {
				return { data: [...data[key]], name: key };
			});
		if (data) {
			setLoading(false);
			setMovieData(finalData);
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
	const mobileCarouselIds = ['jtmoeqhx', 'jtmocwav', 'jtmoet1l'];
	let carouselContent = carousel.map((c, i) => {
		return (
			<div key={c.unique_id}>
				<Link to={`/content/${mobileCarouselIds[i]}`}>
					<SliderPoster src={c.poster} />
				</Link>
			</div>
		);
	});
	let desktopCarouselContent = (
		<Slider {...settings}>
			<Link to="/content/jtmoet1l">
				<img src="https://m.media-amazon.com/images/G/01/digital/video/sonata/Hero_PV_IN_MIH_Review/8320f0ae-b5df-4493-8576-b0a15a362cb7._UR3000,600_SX1500_FMwebp_.jpg" />
			</Link>
			<Link to="/content/jtmoeksj">
				<img src="https://m.media-amazon.com/images/G/01/digital/video/sonata/Oceans8/e3e030e3-99f3-4d4b-83c0-726fb774b68b._UR3000,600_SX1500_FMwebp_.jpg" />
			</Link>
			<Link to="/content/jtmoet14">
				<img src="https://m.media-amazon.com/images/G/01/digital/video/sonata/Hero_IN_FMSPshowlaunch/2bd396d3-c5b8-407a-bb4f-f5eb1419c9b9._UR3000,600_SX1500_FMwebp_.jpg" />
			</Link>
		</Slider>
	);
	return loading ? (
		<Spinner />
	) : (
		<div>
			<SliderContainer>
				{props.view.isDesktop ? (
					desktopCarouselContent
				) : (
					<Slider {...settings}>{carouselContent}</Slider>
				)}
			</SliderContainer>
			<MovieSection movieData={movieData} />
		</div>
	);
};
const mapStateToProps = state => {
	return {
		view: state.screenView
	};
};
export default connect(mapStateToProps)(Home);
