import axios from '../../axios';
export const MOBILE_VIEW = 'MOBILE_VIEW';
export const DESKTOP_VIEW = 'DESKTOP_VIEW';
export const SET_LOGIN = 'SET_LOGIN';
export const LOGOUT = 'LOGOUT';
export const INIT_LOGIN = 'INIT_LOGIN';

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

export const setLogin = payload => {
	// let data = payload.payload;
	// let userName, userId, imageUrl, authToken;
	// userName = data.name;
	// userId = data.userID;
	// authToken = jwt;
	// if (data.picture) {
	// 	imageUrl = data.picture.data.url;
	// }
	// const userData = {
	// 	userName,
	// 	userId,
	// 	imageUrl,
	// 	authToken
	// };
	let data = payload.payload;
	const userData = {
		userName: data.userName,
		userId: data.userId,
		imageUrl: data.imageUrl,
		authToken: data.authToken
	};
	return {
		type: SET_LOGIN,
		payload: userData
	};
};

export const initLogIn = payload => {
	let data = payload.payload;
	let name, facebookUserID, image_url;
	name = data.name;
	facebookUserID = data.userID;
	if (data.picture) {
		image_url = data.picture.data.url;
	}
	const userData = {
		name,
		facebookUserID,
		image_url
	};

	return async dispatch => {
		let resp = await axios.post('/fb-auth', userData);
		let data = payload.payload;
		let userName, userId, imageUrl, authToken;
		userName = data.name;
		userId = data.userID;
		authToken = resp.data;
		if (data.picture) {
			imageUrl = data.picture.data.url;
		}
		localStorage.setItem('authToken', authToken);
		localStorage.setItem('userName', userName);
		localStorage.setItem('imageUrl', imageUrl);
		localStorage.setItem('userId', userId);
		const usrData = {
			userName,
			userId,
			imageUrl,
			authToken
		};
		dispatch(setLogin(usrData));
	};
};

export const logout = () => {
	return {
		type: LOGOUT
	};
};
