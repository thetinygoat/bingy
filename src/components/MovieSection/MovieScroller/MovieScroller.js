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
	const constructPosterUrl = (query, title) => {
		const QUERY_ARRAY = query.split('/');
		const BASE_URL = 'https://images.justwatch.com';
		const TYPE = QUERY_ARRAY[1];
		const ID = QUERY_ARRAY[2];
		const RES = 's166';
		return `${BASE_URL}/${TYPE}/${ID}/${RES}/${title}`;
	};
	return (
		<Scroller>
			{data.map(movie => {
				return (
					<Link key={movie.unique_id} to={`/content/${movie.unique_id}`}>
						{movie.poster ? (
							<Poster
								src={constructPosterUrl(movie.poster)}
								alt={movie.title}
								key={movie.poster}
							/>
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
