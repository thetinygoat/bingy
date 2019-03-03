import React from 'react';
import MovieScroller from './MovieScroller/MovieScroller';
import styled from 'styled-components';
const MovieSectionContainer = styled.section`
	display: flex;
	overflow-x: scroll;
	margin: 1em 0;
	flex-direction: column;
`;
const MovieSection = props => {
	let data = Object.keys(props.movieData).map(key => {
		return { content: [props.movieData[key]], category: key };
	});
	console.log(data);
	return (
		<div>
			{data.map(category => {
				return (
					<MovieSectionContainer key={category.category}>
						{category.category}
						<MovieScroller category={category} />
					</MovieSectionContainer>
				);
			})}
		</div>
	);
};

export default MovieSection;
