import firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: 'AIzaSyBRFL5qW4QMEucsWcWGfuSY4yG2cbsuhqc',
	authDomain: 'bingy-prod.firebaseapp.com',
	databaseURL: 'https://bingy-prod.firebaseio.com',
	projectId: 'bingy-prod',
	storageBucket: 'bingy-prod.appspot.com',
	messagingSenderId: '453936517741'
};
firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();
