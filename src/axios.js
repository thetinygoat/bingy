import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://moviemafia.herokuapp.com'
});
export default instance;
