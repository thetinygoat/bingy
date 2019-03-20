import { LOGOUT, SET_LOGIN } from '../actions/actions';
const initialState = {
	userName: '',
	userId: '',
	authToken: '',
	imageUrl: '',
	isLoggedIn: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_LOGIN: {
		return {
			...initialState,
			...action.payload,
			isLoggedIn: true
		};
	}
	case LOGOUT: {
		return {
			...initialState,
			isLoggedIn: false
		};
	}
	default:
		return state;
	}
};
export default reducer;
