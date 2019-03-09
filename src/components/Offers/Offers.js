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
const Offer = styled.img`
	width: 60px;
	height: 60px;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
	border-radius: 200px;
	margin: 0.3em;
`;

const OfferContainer = styled.div`
	display: flex;
	overflow-x: auto;
	justify-content: center;
`;

export default function Offers(props) {
	const offers = props.offers.map(offer => {
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
			return (
				<a href={offer.urls.standard_web} key={offer.provider_mapping}>
					<Offer src={src} alt={offer.provider_mapping} />
				</a>
			);
		}
	});
	return <OfferContainer>{offers}</OfferContainer>;
}
