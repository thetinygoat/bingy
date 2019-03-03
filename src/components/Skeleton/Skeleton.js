import React from 'react';
import styled, { keyframes } from 'styled-components';
const shine = keyframes`
0% {
	background-position: -10em
}

100% {
	background-position:20em
}
`;

export const Poster = styled.div`
	width: 160px;
	height: 236px;
	animation: ${shine} 3s infinite linear;
	background-color: #182635;
	background-image: linear-gradient(
		90deg,
		#182635 0px,
		#284058 40px,
		#182635 80px
	);
`;
export const Line = styled.div`
	height: 1em;
	width: ${props => props.length};
	margin: 5px;
	animation: ${shine} 3s infinite linear;
	background-color: #182635;
	background-image: linear-gradient(
		90deg,
		#182635 0px,
		#284058 40px,
		#182635 80px
	);
`;
export const Title = styled.div`
	margin: 0 auto;
	height: 2em;
	width: 20%;
	margin: 5px;
	animation: ${shine} 3s infinite linear;
	background-color: #182635;
	background-image: linear-gradient(
		90deg,
		#182635 0px,
		#284058 40px,
		#182635 80px
	);
	@media (max-width: 730px) {
		width: 70%;
		margin: 1em;
	}
`;
export const Offer = styled.div`
	height: 4em;
	width: 8%;
	margin: 5px;
	border-radius: 5px;
	animation: ${shine} 3s infinite linear;
	background-color: #182635;
	background-image: linear-gradient(
		90deg,
		#182635 0px,
		#284058 40px,
		#182635 80px
	);
	@media (max-width: 730px) {
		width: 22%;
	}
`;
