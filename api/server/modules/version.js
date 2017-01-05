'use strict';

// See: https://github.com/p-meier/hapi-api-version

module.exports = {
	register: require('hapi-api-version'),
	options: {
		basePath: '/api/',
		validVersions: [1],
		defaultVersion: 1,
		vendorName: 'hapi-swagger-training'
	}
};