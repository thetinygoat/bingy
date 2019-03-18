import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Poster = styled.img`
	margin-right: 10px;
	border-radius: 10px;
	@media (max-width: 730px) {
		width: 120px;
	}
`;
const Scroller = styled.section`
	display: flex;
`;
const Title = styled.p`
	text-decoration: none;
	color: #e2e2e2;
	font-size: .8em;
	margin-top: .2em
	font-weight: bold;
	display: flex
	flex-wrap:wrap
	width: 90%
`;
const MovieScroller = props => {
	let data = props.category.content[0].map(movie => {
		return (
			<Link key={movie.unique_id} to={`/content/${movie.unique_id}`}>
				<Poster src={movie.poster} alt={movie.title} key={movie.poster} />
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
