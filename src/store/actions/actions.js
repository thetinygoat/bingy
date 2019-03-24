import axios from '../../axios';
export const MOBILE_VIEW = 'MOBILE_VIEW';
export const DESKTOP_VIEW = 'DESKTOP_VIEW';
export const LOGIN_INIT = 'LOGIN_INIT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export const mobileView = () => {
	return {
		type: MOBILE_VIEW
	};
};

export const desktopView = () => {
	return {
		type: DESKTOP_VIEW
	};
};

export const loginInit = () => {
	return {
		type: LOGIN_INIT
	};
};

export const loginMiddleware = payload => {
	return async dispatch => {
		const data = payload.payload;
		const user = {
			facebookUserID: data.userId,
			email: data.email,
			image_url: data.imageUrl,
			name: data.userName,
			phone_number: data.phone
		};
		let response = await axios.post('/fb-auth', user);
		if (response) {
			localStorage.setItem('userName', payload.payload.userName);
			localStorage.setItem('imageUrl', payload.payload.imageUrl);
			localStorage.setItem('email', payload.payload.email);
			localStorage.setItem('userId', payload.payload.userId);
			localStorage.setItem('authToken', response.data);
			let finalPayload = { ...payload.payload, authToken: response.data };
			dispatch(loginSuccess(finalPayload));
		}
	};
};

export const loginSuccess = payload => {
	return {
		type: LOGIN_SUCCESS,
		payload: payload
	};
};

export const loginFail = () => {
	return {
		type: LOGIN_FAIL
	};
};

export const logout = () => {
	localStorage.clear();
	return {
		type: LOGOUT
	};
};
