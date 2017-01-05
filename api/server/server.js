'use strict';

const Hapi = require('hapi'),
	subscriptions = require('./modules/subscriptions'),
	plugins = require('./modules/plugins'),
	routes = require('./init/routes'),
	basicAuthValidation = require('./modules/auth').basicAuth;

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

			// Basic HTTP auth - the 3rd param is `true`, which will turn on validation by default for all routes, unless specified specifically on the route itself
			server.auth.strategy('basic', 'basic', true, { validateFunc: basicAuthValidation });

			// Initialize routes
			server.route(routes(server));

			// Setup which routes host subscriptions
			subscriptions(server);

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
