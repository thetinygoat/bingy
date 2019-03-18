import React, { Component } from 'react';
import styled from 'styled-components';
import Search from '../../pages/Search/Search';
import { Link } from 'react-router-dom';
const Navbar = styled.section`
	background-color: #0a1016;
	position: fixed;
	top: 0;
	width: 100%;
	padding: 1em;
	box-sizing: border-box;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`;
const Container = styled.div`
	width: 85%;
	margin: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Actions = styled.div`
	display: flex;
`;
const Action = styled.div`
	margin-right: ${props => (props.last ? '0px' : '20px')};
`;
export class MobileTopBar extends Component {
	state = {
		isSearchOpen: false
	};
	handleSearchPageClose = () => {
		this.setState(state => {
			return {
				isSearchOpen: !state.isSearchOpen
			};
		});
	};
	render() {
		return (
			<div>
				<Navbar>
					<Container>
						<Link to="/" style={{ color: '#e2e2e2' }}>
							<h1>Bingy</h1>
						</Link>
						<Actions>
							<Action
								onClick={() =>
									this.setState(state => {
										return {
											isSearchOpen: !state.isSearchOpen
										};
									})
								}
							>
								<i className="material-icons">search</i>
							</Action>
							<Action last>
								<i className="material-icons">settings</i>
							</Action>
						</Actions>
					</Container>
				</Navbar>
				{this.state.isSearchOpen && (
					<Search closeSearch={this.handleSearchPageClose} />
				)}
			</div>
		);
	}
}

export default MobileTopBar;
