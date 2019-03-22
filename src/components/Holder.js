import styled from 'styled-components';
export const DynamicHolder = styled.div`
	margin-right: 1.2em;
	border-radius: 4px;
	height: 85%;
	width: 160px;
	display: flex;
	font-size: 0.8em;
	text-align: center;
	background-color: #284058;
	color: grey;
	justify-content: center;
	align-items: center;
	@media (max-width: 730px) {
		width: 120px;
	}
`;

export const FixedHolder = styled.div`
	margin-right: ${props => (props.search ? '1.2em' : '0')};
	border-radius: 4px;
	height: 213px;
	min-width: 160px;
	max-width: 160px;
	display: flex;
	font-size: 0.8em;
	text-align: center;
	background-color: #284058;
	justify-content: center;
	align-items: center;
	@media (max-width: 730px) {
		min-width: ${props => (props.search ? '120px' : '160px')};
		max-width: ${props => (props.search ? '120px' : '160px')};
		height: ${props => (props.search ? '170px' : '213px')};
	}
	color: grey;
`;
