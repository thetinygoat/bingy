import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Title } from '../../Typography';
import { Poster } from '../../Poster';
import { DynamicHolder } from '../../Holder';
const Scroller = styled.section`
	display: flex;
`;

const MovieScroller = ({ data }) => {
	return (
		<Scroller>
			{data.map(movie => {
				return (
					<Link key={movie.unique_id} to={`/content/${movie.unique_id}`}>
						{movie.poster ? (
							<Poster src={movie.poster} alt={movie.title} key={movie.poster} />
						) : (
							<DynamicHolder>
								{movie.title} ({movie.original_release_year})
							</DynamicHolder>
						)}
						<Title>
							{movie.title}({movie.original_release_year})
						</Title>
					</Link>
				);
			})}
		</Scroller>
	);
};

export default MovieScroller;
