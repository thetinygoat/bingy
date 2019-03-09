import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const Poster = styled.img`
	width: 100px;
	margin-right: 10px;
	border-radius: 10px;
`;
const Scroller = styled.section`
	display: flex;
`;

const shine = keyframes``;
const MovieScroller = props => {
	let data = props.category.content[0].map(movie => {
		return (
			<Link key={movie.unique_id} to={`/content/${movie.unique_id}`}>
				<Poster
					src={movie.poster}
					alt={movie.title}
					key={movie.poster}
					height="142.16px"
					width="100px"
				/>
			</Link>
		);
	});
	return <Scroller>{data}</Scroller>;
};

export default MovieScroller;
