'use strict';

const firebase = require('firebase-admin'),
	// Follow the instructions in the README.md to get your own firebase credentials file, and point to that file here
	creds = require('../../firebase_credentials.json');

const db = firebase.initializeApp({
	credential: firebase.credential.cert(creds.key),
	databaseURL: creds.databaseURL
});

module.exports = db;
