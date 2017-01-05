'use strict';

/*
	This file is a one-time script to initialize your Firebase database with sample data
*/

const userFunctions = require('../handlers/user-handler');

// A bunch of users, to initialize the database with people to play with
const users = [{
	username: 'admin',
	password: 'admin',
	scope: 'ADMIN'
},{
	username: 'user',
	password: 'user',
	scope: 'USER'
},{
	username: 'user2',
	password: 'user2',
	scope: 'USER'
},{
	username: 'user3',
	password: 'user3',
	scope: 'USER'
},{
	username: 'user4',
	password: 'user4',
	scope: 'USER'
},{
	username: 'user5',
	password: 'user5',
	scope: 'USER'
},{
	username: 'user6',
	password: 'user6',
	scope: 'USER'
},{
	username: 'user7',
	password: 'user7',
	scope: 'USER'
},{
	username: 'user8',
	password: 'user8',
	scope: 'USER'
},{
	username: 'user9',
	password: 'user9',
	scope: 'USER'
}];

Promise.all(users.map(({username, password, scope}) => 
	new Promise((resolve, reject) => {
		/* 
			Faking a request here so that we can re-use this function
			Normally, this is a great case for using the built-in Hapi method `server.inject()`, but I wanted this script to be stand-alone (can be run without starting the server), and also didn't want to have to figure out the auth credentials issue I'm assuming I would have.
		*/
		userFunctions.newUser({
			payload: {
				username,
				password,
				scope
			}
		}, (user) => resolve(user))
	})
))
.then(() => {
	console.log('Default users have been added to Firebase');
	process.exit();
})
.catch(err => {
	console.error(err)
	process.exit();
});
