import React, { useState } from 'react';
import styled from 'styled-components';
import axios from '../../axios';
import { Link } from 'react-router-dom';
const Searchpage = styled.section`
	position: fixed;
	height: 100vh;
	background-color: #0a1016;
	width: 100%;
	top: 0;
	overflow-y: auto;
	overflow-x: hidden;
	z-index: 99999;
`;
const Poster = styled.img`
	width: 120px;
	border-radius: 10px;
`;
const Container = styled.div`
	width: 95%;
	margin: auto;
	display: flex;
	jsutify-content: center;
	align-items: center;
	flex-direction: column;
`;
const Grid = styled.section`
	display: flex;
	flex-wrap: wrap;
	margin-top: 5em;
	justify-content: center;
`;
const Items = styled.div`
	flex: 1;
	align-self: flex-start;
	margin: 0.8em;
`;
const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	position: fixed;
	background-color: #0a1016;
	width: 100%;
	justify-content: center;
	padding: 0.5em;
`;
const SearchBarStyler = styled.div`
	display: flex;
	align-items: center;
	background-color: #223241;
	width: 90%;
	border-radius: 10px;
`;
const Searchbar = styled.input`
	background: transparent;
	outline: none;
	border: none;
	padding: 1em;
	width: 100%;
	color: #e5e5e5;
	font-size: 1em;
`;
const BackButton = styled.div`
	padding: 10px;
`;
const Title = styled.p`
	text-decoration: none;
	color: #e5e5e5;
	font-size: .8em;
	margin-top: .2em
	font-weight: bold;
`;
const Search = props => {
	const [query, setQuery] = useState('');
	const [data, setData] = useState([]);
	const searchMovies = async () => {
		let res = await axios.post('/movie-search', {
			data: query
		});
		setData(res.data.movies);
		console.log(res.data);
	};
	const handleChange = e => {
		setQuery(e.target.value);
		searchMovies();
	};
	return (
		<Searchpage>
			<Container>
				<SearchBarContainer>
					<SearchBarStyler>
						<BackButton onClick={props.closeSearch}>
							<i className="material-icons">arrow_back</i>
						</BackButton>
						<Searchbar
							placeholder="search"
							value={query}
							onChange={handleChange}
						/>
					</SearchBarStyler>
				</SearchBarContainer>
				<Grid>
					{data &&
						data.map(movie => {
							return (
								<Link
									key={movie.unique_id}
									to={`/content/${movie.unique_id}`}
									onClick={props.closeSearch}
								>
									<Items>
										<Poster src={movie.poster} />
										<Title>
											{movie.title.substring(0, 10) + '...'}(
											{movie.original_release_year})
										</Title>
									</Items>
								</Link>
							);
						})}
				</Grid>
			</Container>
		</Searchpage>
	);
};

export default Search;
