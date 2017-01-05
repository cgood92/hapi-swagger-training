'use strict';

const Swagger = require('./swagger'),
	Inert = require('inert'),
	Vision = require('vision'),
	Good = require('./good'),
	Blipp = { register: require('blipp'), options: { showAuth: true } },
	BasicAuth = require('hapi-auth-basic'),
	Cors = require('./cors'),
	Version = require('./version');

module.exports = [Swagger, Inert, Vision, Good, Blipp, BasicAuth, Cors, Version];
