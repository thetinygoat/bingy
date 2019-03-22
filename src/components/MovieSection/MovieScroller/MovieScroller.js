import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Poster = styled.img`
	margin-right: 1.2em;
	border-radius: 4px;
	width: 150px;
	@media (max-width: 730px) {
		width: 120px;
	}
`;
const Scroller = styled.section`
	display: flex;
`;
const Title = styled.p`
	text-decoration: none;
	color: #a4a6a7;
	font-size: .8em;
	margin-top: .2em
	display: flex
	flex-wrap:wrap
	width: 90%
`;
const Holder = styled.div`
	margin-right: 1.2em;
	border-radius: 4px;
	height: 87%;
	width: 150px;
	display: flex;
	background-color: #284058;
	justify-content: center;
	align-items: center;
	@media (max-width: 730px) {
		width: 120px;
	}
	color: grey;
`;
const MovieScroller = props => {
	let data = props.category.content[0].map(movie => {
		return (
			<Link key={movie.unique_id} to={`/content/${movie.unique_id}`}>
				{movie.poster ? (
					<Poster src={movie.poster} alt={movie.title} key={movie.poster} />
				) : (
					<Holder>
						{movie.title} ({movie.original_release_year})
					</Holder>
				)}
				{/* <img data-src="holder.js/100px75?theme=social" /> */}
				<Title>
					{/* {movie.title.length > 10
						? movie.title.substring(0, 10) + '...'
						: movie.title}
					({movie.original_release_year}) */}
					{movie.title}({movie.original_release_year})
				</Title>
			</Link>
		);
	});
	return <Scroller>{data}</Scroller>;
};

export default MovieScroller;
