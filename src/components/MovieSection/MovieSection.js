import React from 'react';
import MovieScroller from './MovieScroller/MovieScroller';
import styled from 'styled-components';
const MovieSectionContainer = styled.section`
	display: flex;
	overflow-x: auto;
	flex-direction: column;
`;
const SubHeading = styled.h1`
	font-size: 1.3em;
	margin-bottom: 1em;
`;
const Container = styled.section`
	margin: 2em 0 3em 3em;
	@media (max-width: 730px) {
		margin: 1em 0 1em 1em;
	}
`;
const MovieSection = ({ movieData }) => {
	return (
		<div>
			{movieData.map(category => {
				return (
					<Container key={category.name} className="desc_content_role">
						<SubHeading>{category.name}</SubHeading>
						<MovieSectionContainer>
							<MovieScroller data={category.list} />
						</MovieSectionContainer>
					</Container>
				);
			})}
		</div>
	);
};

export default MovieSection;
