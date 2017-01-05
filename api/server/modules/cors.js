'use strict';

// See: https://github.com/gabaroar/hapi-cors

module.exports = {
	register: require('hapi-cors'),
	options: {
		// Allow consumption by any host
		origins: ['*'],
		// Allows authentication to be sent by default
		allowCredentials: 'true',
		// These headers can be consumed
		exposeHeaders: ['content-type', 'content-length', 'api-version'],
		// For caching
		maxAge: 600,
		// These methods are allowed
		methods: ['POST, GET, OPTIONS, DELETE, PUT'],
		// These request headers can be sent
		headers: ['Accept', 'Content-Type', 'Authorization', 'api-version']
	}
};

