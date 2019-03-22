import React, { Component } from 'react';
import styled from 'styled-components';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { FixedHolder } from '../../components/Holder';
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
	margin-right: 1.2em;
	border-radius: 4px;
	width: 150px;
	@media (max-width: 730px) {
		width: 120px;
	}
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
// const Searchbar = styled.input`
// 	background: transparent;
// 	outline: none;
// 	border: none;
// 	padding: 1em;
// 	width: 100%;
// 	color: #e5e5e5;
// 	font-size: 1em;
// `;
const BackButton = styled.div`
	padding: 10px;
`;
const Title = styled.p`
	text-decoration: none;
	color: #a4a6a7;
	font-size: 0.8em;
	margin-top: 0.2em;
	width: 9em;
`;

class Search extends Component {
	state = {
		query: '',
		data: []
	};
	searchMovies = async () => {
		let res = await axios.post('/autocomplete', {
			data: this.state.query
		});
		this.setState({ data: res.data.movies });
	};
	handleChange = async e => {
		this.setState({ query: e.target.value });
		this.searchMovies();
	};
	constructPosterUrl = (query, title) => {
		const QUERY_ARRAY = query.split('/');
		const BASE_URL = 'https://images.justwatch.com';
		const TYPE = QUERY_ARRAY[1];
		const ID = QUERY_ARRAY[2];
		const RES = 's166';
		return `${BASE_URL}/${TYPE}/${ID}/${RES}/${title}`;
	};
	render() {
		return (
			<Searchpage>
				<Container>
					<SearchBarContainer>
						<SearchBarStyler>
							<BackButton
								onClick={this.props.closeSearch}
								style={{ cursor: 'pointer' }}
							>
								<i className="material-icons">arrow_back</i>
							</BackButton>
							{/* <Searchbar
								placeholder="search"
								// value={query}
								// onChange={handleChange}
								ref={node => (inputRef = node)}
							/> */}
							<DebounceInput
								debounceTimeout={500}
								onChange={this.handleChange}
								type="text"
								placeholder="Search"
								value={this.state.query}
								style={{
									background: 'transparent',
									outline: 'none',
									border: 'none',
									padding: '1em',
									width: '100%',
									color: '#e5e5e5',
									fontSize: '1em'
								}}
							/>
						</SearchBarStyler>
					</SearchBarContainer>
					<Grid>
						{this.state.data &&
							this.state.data.map(movie => {
								let url;
								if (movie.poster) {
									url = this.constructPosterUrl(movie.poster, movie.title);
								}
								return (
									<Link
										key={movie.unique_id}
										to={`/content/${movie.unique_id}`}
										onClick={this.props.closeSearch}
									>
										<Items>
											{movie.poster ? (
												<Poster src={url} />
											) : (
												<FixedHolder search>
													{movie.title}({movie.original_release_year})
												</FixedHolder>
											)}
											<Title>
												{movie.title}({movie.original_release_year})
											</Title>
										</Items>
									</Link>
								);
							})}
					</Grid>
				</Container>
			</Searchpage>
		);
	}
}
export default Search;
