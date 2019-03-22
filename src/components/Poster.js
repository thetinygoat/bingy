import styled from 'styled-components';
export const Poster = styled.img`
	margin-right: 1.2em;
	border-radius: 4px;
	width: 150px;
	@media (max-width: 730px) {
		width: ${props => (props.contentPage ? '120px' : '213px')};
	}
`;
