import React from 'react';
import amazonPrimeVideo from './logos/amazon-prime-video.jpeg';
import appleItunes from './logos/apple-itunes.jpeg';
import erosNow from './logos/eros-now.jpeg';
import googlePlayMovies from './logos/google-play-movies.jpeg';
import guidedoc from './logos/guidedoc.jpeg';
import hooq from './logos/hooq.jpeg';
import hotstar from './logos/hotstar.jpeg';
import jioCinema from './logos/jio-cinema.jpeg';
import mubi from './logos/mubi.jpeg';
import netflixKids from './logos/netflix-kids.jpeg';
import netflix from './logos/netflix.jpeg';
import sonyLiv from './logos/sony-liv.jpeg';
import tubiTv from './logos/tubi-tv.jpeg';
import viu from './logos/viu.jpeg';
import voot from './logos/voot.jpeg';
import youtube from './logos/youtube.jpeg';
import zee5 from './logos/zee5.jpeg';
import styled from 'styled-components';
import ax from 'axios';
import { withRouter } from 'react-router-dom';
const Offer = styled.img`
	width: 60px;
	height: 60px;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
	border-radius: 200px;
	margin: 0.3em;
	cursor: pointer;
`;

const OfferContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	margin: auto;
	box-sizing: border-box;
	flex-direction: column;
	@media (max-width: 730px) {
	}
`;
const OfferProviderContainer = styled.div`
	text-align: left;
	@media (max-width: 730px) {
		text-align: center;
	}
`;
function Offers(props) {
	async function sendTelemetry() {}
	let freeArray = [];
	let subArray = [];
	let rentArray = [];
	props.offers.map(offer => {
		let src = null;
		switch (offer.provider_mapping) {
		case 'iTunes':
			src = appleItunes;
			break;
		case 'Netflix':
			src = netflix;
			break;
		case 'Prime Video':
			src = amazonPrimeVideo;
			break;
		case 'Hotstar':
			src = hotstar;
			break;
		case 'Hooq':
			src = hooq;
			break;
		case 'Voot':
			src = voot;
			break;
		case 'Viu':
			src = viu;
			break;
		case 'Jio Cinema':
			src = jioCinema;
			break;
		case 'Google Play':
			src = googlePlayMovies;
			break;
		case 'Youtube Movies':
			src = youtube;
			break;
		case 'Zee5':
			src = zee5;
			break;
		case 'Eros Now':
			src = erosNow;
			break;
		case 'Mubi':
			src = mubi;
			break;
		case 'Sony Liv':
			src = sonyLiv;
			break;
		case 'Guidedoc':
			src = guidedoc;
			break;
		case 'Netflix Kids':
			src = netflixKids;
			break;
		case 'Tubi Tv':
			src = tubiTv;
			break;
		default:
			src = null;
		}
		if (offer.provider_mapping === 'BookmyShow') {
			return null;
		} else {
			if (
				offer.monetization_type === 'free' ||
				offer.monetization_type === 'ads'
			) {
				const offerObj = {
					name: offer.provider_mapping,
					link: offer.urls.standard_web,
					src: src,
					id: offer.provider_id
				};
				freeArray.push(offerObj);
			}
			if (offer.monetization_type === 'flatrate') {
				const offerObj = {
					name: offer.provider_mapping,
					link: offer.urls.standard_web,
					src: src,
					id: offer.provider_id
				};
				subArray.push(offerObj);
			}
			if (
				offer.monetization_type === 'buy' ||
				offer.monetization_type === 'rent'
			) {
				const offerObj = {
					name: offer.provider_mapping,
					link: offer.urls.standard_web,
					src: src,
					id: offer.provider_id
				};
				rentArray.push(offerObj);
			}
			return null;
		}
	});
	return (
		<OfferContainer>
			{freeArray.length > 0 && (
				<OfferProviderContainer>
					<h3 style={{ margin: '10px' }}>Free</h3>
					{freeArray.map(provider => (
						<Offer
							src={provider.src}
							key={provider.name}
							onClick={async () => {
								window.open(provider.link, '_blank');
								let headers = {
									'Content-Type': 'application/json',
									pwa_jwt: localStorage.getItem('guest_jwt')
								};
								const res = await ax.post(
									'https://peaceful-temple-71507.herokuapp.com/api/guests/logTitleOffering ',
									{
										headers: headers,
										unique_id: props.match.params.id,
										provider_id: provider.id.toString()
									}
								);
							}}
						/>
					))}
				</OfferProviderContainer>
			)}
			{subArray.length > 0 && (
				<OfferProviderContainer>
					<h3 style={{ margin: '10px' }}>Subscription</h3>
					{subArray.map(provider => (
						<Offer
							src={provider.src}
							key={provider.name}
							onClick={async () => {
								window.open(provider.link, '_blank');
								let headers = {
									'Content-Type': 'application/json',
									pwa_jwt: localStorage.getItem('guest_jwt')
								};
								const res = await ax.post(
									'https://peaceful-temple-71507.herokuapp.com/api/guests/logTitleOffering ',
									{
										headers: headers,
										unique_id: props.match.params.id,
										provider_id: provider.id.toString()
									}
								);
							}}
						/>
					))}
				</OfferProviderContainer>
			)}
			{rentArray.length > 0 && (
				<OfferProviderContainer>
					<h3 style={{ margin: '10px' }}>Rent</h3>
					{rentArray.map(provider => (
						<Offer
							src={provider.src}
							key={provider.name}
							onClick={async () => {
								window.open(provider.link, '_blank');
								let headers = {
									'Content-Type': 'application/json',
									pwa_jwt: localStorage.getItem('guest_jwt')
								};
								const res = await ax.post(
									'https://peaceful-temple-71507.herokuapp.com/api/guests/logTitleOffering ',
									{
										headers: headers,
										unique_id: props.match.params.id,
										provider_id: provider.id.toString()
									}
								);
							}}
						/>
					))}
				</OfferProviderContainer>
			)}
		</OfferContainer>
	);
}

export default withRouter(Offers);
