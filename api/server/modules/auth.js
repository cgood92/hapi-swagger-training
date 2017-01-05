'use strict';

// See: https://github.com/hapijs/hapi-auth-basic

const bcrypt = require('bcrypt'),
	Hoek = require('hoek');

// Log the bad attempt
const badAttempt = (username) => {
	console.log(`User '${username}' was rejected access...`);
};

// Validation function for HTTP basic auth
const validate = (username, password, cb) => {
	// Have to put `require` here instead of up above.  If you were to put it up above, then Node.js would load user-handler.js, which in turn loads this module.  Because there is a loop, Node.js compromises by having this `require = {}`.  That means we can't access any of the actual methods in user-handler.js.  If we have the require here, it doesn't try to load the module until this function is called, which will prevent the issue.
	require('../handlers/user-handler')._getUser(username, password).then((user) => {
		// No user - bad attempt
		if (!user) {
			badAttempt(username);
			return cb(null, false);
		}

		// Expose these elements of the user
		if (user.scope) {
			Hoek.assert(Hoek.contain(scopes, user.scope), `this user has a scope (${user.scope}) that is not valid (valid: ${scopes})`);
		}
		const userExposed = {
			id: user.id,
			scope: user.scope
		};

		// Call the callback
		cb(null, true, userExposed);

	}).catch(err => {
		badAttempt(username);
		return cb(null, false);
	});
};

// To be used in conjunction with hapi-auth-basic
const basicAuth = (req, username, password, cb) => validate(username, password, cb);

// These are the scopes for our users, to be used to scope down routes and authentication
const scopes = ['USER','ADMIN'];

module.exports = {
	basicAuth,
	validate,
	scopes
};