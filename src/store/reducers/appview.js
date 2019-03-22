import { MOBILE_VIEW, DESKTOP_VIEW } from '../actions/actions';
const initialState = {
	isMobile: true,
	isDesktop: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case MOBILE_VIEW: {
		return {
			isMobile: true,
			isDesktop: false
		};
	}
	case DESKTOP_VIEW: {
		return {
			isDesktop: true,
			isMobile: false
		};
	}
	default:
		return state;
	}
};

export default reducer;
