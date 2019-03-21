import {
	LOGIN_INIT,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT
} from '../actions/actions';
const initialState = {
	userName: '',
	email: '',
	userId: '',
	authToken: '',
	imageUrl: '',
	phone: '',
	accessToken: '',
	isLoggedIn: false,
	loginSuccess: false,
	loginFail: false,
	loginInit: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case LOGIN_INIT: {
		return {
			...initialState,
			loginInit: true
		};
	}
	case LOGIN_SUCCESS: {
		return {
			...state,
			...action.payload,
			isLoggedIn: true,
			loginSuccess: true
		};
	}
	case LOGIN_FAIL: {
		return {
			...state,
			isLoggedIn: false,
			loginFail: true
		};
	}
	case LOGOUT: {
		return {
			...state,
			isLoggedIn: false
		};
	}
	// case
	default:
		return state;
	}
};
export default reducer;
