'use strict';

const Inert = require('inert'),
	Vision = require('vision'),
	Swagger = require('./swagger'),
	Good = require('./good'),
	Blipp = { register: require('blipp'), options: { showAuth: true } },
	BasicAuth = require('hapi-auth-basic'),
	Cors = require('./cors'),
	Version = require('./version'),
	Nes = require('nes');

module.exports = [Inert, Vision, Swagger, Good, Blipp, BasicAuth, Cors, Version, Nes];