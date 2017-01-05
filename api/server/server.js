'use strict';

const Hapi = require('hapi'),
	plugins = require('./modules/plugins'),
	routes = require('./init/routes');

const start = (host, port) => {
	return new Promise((resolve, reject) => {

		// Create the server
		const server = new Hapi.Server();
		server.connection({host,port});

		// Register all the plugins
		server.register(plugins, (err) => {
			if (err) {
				console.error(err);
				return reject(err);
			}

			// Initialize routes
			server.route(routes(server));

			// Start accepting requests
			server.start( (err) => {
				if (err) {
					console.error(err);
					return reject(err);
				}

				// Server started successfully - register routes
				console.log(`Server running at: ${server.info.uri}`);
				resolve();
			});

			server.on('request-error', (req, err) => {
				console.error(err);
			});
		});
	});
};

module.exports = {
	start
};
