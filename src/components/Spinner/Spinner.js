import React from 'react';
import './Spinner.css';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;
`;

const Spinner = () => {
	return (
		<Container>
			<div className="lds-ring">
				<div />
				<div />
				<div />
				<div />
			</div>
		</Container>
	);
};

export default Spinner;
