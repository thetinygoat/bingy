import firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: 'AIzaSyCJINoWiBwC-T0PqgK5hcCDqxBGtHsWcmM',
	authDomain: 'bingy-prod-25e0a.firebaseapp.com',
	databaseURL: 'https://bingy-prod-25e0a.firebaseio.com',
	projectId: 'bingy-prod-25e0a',
	storageBucket: 'bingy-prod-25e0a.appspot.com',
	messagingSenderId: '591281018597'
};
firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();
