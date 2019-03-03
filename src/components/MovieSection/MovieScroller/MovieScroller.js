import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const Scroller = styled.section`
	display: flex;
`;

const shine = keyframes``;
const MovieScroller = props => {
	const [skeleton, setSkeleton] = useState(true);
	let data = props.category.content[0].map(movie => {
		return (
			<Link key={movie.unique_id} to={`/content/${movie.unique_id}`}>
				<img src={movie.poster} alt={movie.title} key={movie.poster} />
			</Link>
		);
	});
	return <Scroller>{data}</Scroller>;
};

export default MovieScroller;
