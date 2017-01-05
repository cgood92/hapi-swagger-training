'use strict';

const boom = require('boom'),
	joi = require('joi'),
	db = require('../data/firebase-connector'),
	bcrypt = require('bcrypt'),
	auth = require('../modules/auth'),
	transform = require('../transforms/user-transform');

const _convertSnapshotToUser = (obj) => {
	const val = obj,
		// This will be our userID
		key = Object.keys(val)[0],
		user = Object.assign({}, val[key], { id: key });
	return user;
};

const _hashPassword = (password) => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) {
				return reject(err);
			}

			return resolve(hash);
		});
	});
};

//Get the user from db, if it exists
const _getUser = (username, password) => {
	return new Promise((resolve, reject) => {

		// No username to validate...
		if (username === undefined || username === null) {
			return reject('username is blank');
		}

		// Query db for a username that matches argument
		db.database().ref('users').orderByChild('username').equalTo(username).once('value').then(snapshot => {

			// No username
			if (!snapshot.exists()) {
				return resolve();
			}

			const user = _convertSnapshotToUser(snapshot.val());

			// Hash the password, and see if it matches the DB
			bcrypt.compare(password, user.password, (err, isValid) => {
				// Password is wrong - bad attempt
				if (err || !isValid) {
					return reject(err);
				} 

				// Password is correct, Resolve with user data
				resolve(user);
			});

		}).catch(err => reject(err));
	});
};

// Schema: user
const getUser = (request, reply) => {
	const { username, password } =  request.query;
	_getUser(username, password)
		.then(user => {
			if (!user) {
				return new Promise((resolve, reject) => reject(boom.notFound()));
			}
			return user;
		})
		.then(user => transform.user(user))
		.then(user => reply(user))
		.catch((err = new Error()) => {
			return reply(boom.wrap(err));
		})
};

// Schema: user
const newUser = (request, reply) => {
	const { username, password, scope = 'USER' } =  request.payload;
	_getUser(username, password)
		.then(user => {
			// User already exists - don't create another
			if (user) {
				return new Promise((resolve, reject) => reject(boom.conflict()));
			}

			// Hash password
			return _hashPassword(password);
		}).then(password => 
			// Push new user to Firebase
			db.database().ref('users').push({
				username,
				password,
				scope
			})
		)
		.then(user => user.once('value'))
		.then(snapshot => _convertSnapshotToUser({
			[snapshot.key]: snapshot.val()
		}))
		.then(user => transform.user(user))
		.then(user => reply(user))
		.catch((err = new Error()) => {
			return reply(boom.wrap(err));
		})
};

const schema = {
	user: {
		id: joi
			.string()
			.required()
			.description('id of the user')
			.example('-vt88823nngs'),
		scope: joi
			.string()
			.valid(auth.scopes)
			.description('scope of access for this user')
			.example('USER')
	}
};

module.exports = {
	_getUser,
	getUser,
	newUser,
	schema,
};
