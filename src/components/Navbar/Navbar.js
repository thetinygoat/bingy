import React, { Component } from 'react';
import styled from 'styled-components';
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
	render() {
		return (
			<Navbar>
				<Container>
					<h1>Bingy</h1>
					<Actions>
						<Action>
							<Link to="/search">
								<i className="material-icons">search</i>
							</Link>
						</Action>
						<Action last>
							<i className="material-icons">settings</i>
						</Action>
					</Actions>
				</Container>
			</Navbar>
		);
	}
}

export default MobileTopBar;
