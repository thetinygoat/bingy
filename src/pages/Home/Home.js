import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieSection from '../../components/MovieSection/MovieSection';
import Slider from 'react-slick';
import styled from 'styled-components';
import Spinner from '../../components/Spinner/Spinner';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import carouselPoster from './carousel.jpg';
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
const Home = props => {
	const [loading, setLoading] = useState(true);
	const [movieData, setMovieData] = useState([]);
	// const [carousel, setCarousel] = useState([]);
	const fetchData = async () => {
		let res = await axios.post(
			'https://peaceful-temple-71507.herokuapp.com/homeFeed'
		);
		// let data = res.data;
		// let finalData = Object.keys(data).map(key => {
		// 	console.log(key);
		// });
		// if (data) {
		// 	setLoading(false);
		// 	setMovieData(finalData);
		// 	setCarousel(data.corousel);
		// }
		const data = res.data;
		setMovieData(data);
		setLoading(false);
	};
	useEffect(() => {
		async function setGuestJWT() {
			let headers = {
				'Content-Type': 'application/json',
				pwa_jwt: localStorage.getItem('guest_jwt')
			};
			const res = await axios.post(
				'https://peaceful-temple-71507.herokuapp.com/api/guests/newSession',
				{ headers: headers }
			);
		}
		setGuestJWT();
		document.title = 'Bingy | Watch and find movies and shows online';
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
	// const mobileCarouselIds = ['jtpl8syz', 'jtmoeqhx', 'jtmocwav', 'jtmoet1l'];
	// let carouselContent = carousel.map((c, i) => {
	// 	return (
	// 		<div key={c.unique_id}>
	// 			<Link to={`/content/${mobileCarouselIds[i]}`}>
	// 				{console.log(c.title, c.poster)}
	// 				<SliderPoster src={c.poster} />
	// 			</Link>
	// 		</div>
	// 	);
	// });
	const cContent = (
		<Slider {...settings}>
			<SliderPoster src={carouselPoster} />
			<Link to="/content/jtpl8syz">
				<SliderPoster src="https://m.media-amazon.com/images/G/01/digital/video/sonata/Hero_PV_IN_Manikarnika/46acd23c-1702-493b-b3d7-d58c8617059b._UR1280,600_SX1500_FMjpg_.jpg" />
			</Link>
			<Link to="/content/jtmoeqhx">
				<SliderPoster src="https://firebasestorage.googleapis.com/v0/b/teacher-booth.appspot.com/o/Bingy%2Fmirzapur.jpg?alt=media&token=8573d08a-a223-47ff-b735-7420e47adbfe" />
			</Link>
			<Link to="/content/jtmocwav">
				<SliderPoster src="https://firebasestorage.googleapis.com/v0/b/teacher-booth.appspot.com/o/Bingy%2Fsuits.png?alt=media&token=461ec5c9-b411-4f03-9c31-cde00581426d" />
			</Link>
			<Link to="/content/jtmoet1l">
				<SliderPoster src="https://firebasestorage.googleapis.com/v0/b/teacher-booth.appspot.com/o/Bingy%2Fmade-in-heavan.png?alt=media&token=43fac77b-f16d-4977-a75a-9b316105b947" />
			</Link>
		</Slider>
	);
	let desktopCarouselContent = (
		<Slider {...settings}>
			<Link to="/content/jtpl8syz">
				<img src="https://m.media-amazon.com/images/G/01/digital/video/sonata/Hero_PV_IN_Manikarnika/cd7b8303-8e82-4627-9bf5-e34611bd2a29._UR3000,600_SX1500_FMjpg_.jpg" />
			</Link>
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
			{/* <Tour
				steps={steps}
				isOpen={tour}
				onRequestClose={handleTourCallback}
				disableInteraction
				accentColor="#000"
				lastStepNextButton={<button>Done! Let's start playing</button>}
			/> */}
			<SliderContainer className="desc_carousel_role">
				{props.view.isDesktop ? desktopCarouselContent : cContent}
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
