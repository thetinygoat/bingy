import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import './BottomBar.css';
const Bar = styled.section`
	background-color: #0a1016;
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	justify-content: space-around;
	box-shadow: 10px 10px 7px 10px #0a1016;
`;
const IconContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 0.75em;
	padding: 0.7em;
	color: grey;
`;
const IconDesc = styled.div`
	font-size: 0.8em;
`;

const BottomBar = () => {
	return (
		<Bar className="IconColor">
			<IconContainer>
				<NavLink to="/">
					<i className="material-icons">home</i>
				</NavLink>
				<IconDesc>Home</IconDesc>
			</IconContainer>
			<IconContainer>
				<NavLink to="/">
					<i className="material-icons">movie</i>
				</NavLink>
				<IconDesc>Movies</IconDesc>
			</IconContainer>
			<IconContainer>
				<NavLink to="/">
					<i className="material-icons">tv</i>
				</NavLink>
				<IconDesc>Series</IconDesc>
			</IconContainer>
			<IconContainer>
				<NavLink to="/">
					<i className="material-icons">face</i>
				</NavLink>
				<IconDesc>Profile</IconDesc>
			</IconContainer>
		</Bar>
	);
};

export default BottomBar;
