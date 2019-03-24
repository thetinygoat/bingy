import styled from 'styled-components';
export const Poster = styled.img`
	margin-right: ${props => (props.contentPage ? '0' : '1.2em')};
	border-radius: 4px;
	width: 150px;
	@media (max-width: 730px) {
		width: ${props => (props.contentPage ? '150px' : '120px')};
	}
`;
