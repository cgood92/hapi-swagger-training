'use strict';

const server = require('./server/server'),
	host = process.env.host || 'localhost',
	port = process.env.PORT || 7777;

// Start the server with the host and port specified as passed-in arguments
module.exports = server.start(host, port);
