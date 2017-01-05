'use strict';

// See: https://github.com/glennjones/hapi-swagger

const pkg = require('../../package.json');

module.exports = {
	register: require('hapi-swagger'),
	options: {
		info: {
			title: 'hapi-swagger-training documentation',
			description: `
This API is to demo various aspects of Hapi, Swagger, Nes, etc.

To see all routes, [click here](/).

To see V1 routes only, [click here](/?tags=v1).

To see V2 routes only, [click here](/?tags=v2).

To view the swagger.json, [click here](/swagger.json).
				`,
			// Get the version from package.json
			version: pkg.version,
			contact: {
				name: 'Clint Goodman',
				url: 'https://cgwebsites.net/'
			},
			license: {
				// Get the license from package.json
				name: pkg.license
			}
		},
		// Setup the documentation to be the root of this host
		documentationPath: '/',
		jsonEditor: true,
		tags: [{
			'name': 'starwars',
			'description': 'working with star wars data'
		},{
			'name': 'vote',
			'description': 'working with voting'
		},{
			'name': 'user',
			'description': 'working with users'
		}],
		// This is for use of grouping together paths.  Since each of our paths begin with `/api/v{1,2}`, we want to ignore those first to arguments in the path, since they won't help us group together resources
		pathPrefixSize: 2,
		// This is also used for grouping, though because of the line above, I don't believe that this line may be needed.  Seems to work with/without it.
		basePath: '/api/',
		// Also used for grouping paths together
		pathReplacements: [{
			// Replace the version in all paths
			replaceIn: 'groups',
			pattern: /v([0-9]+)\//,
			replacement: ''
		},{
			// This allows grouping to include plural forms of the noun to be grouped with their singular counter-part (ie `characters` in the group `character`)
			replaceIn: 'groups',
			pattern: /s$/,
			replacement: ''
		},{
			// Group all star wars related routes together
			replaceIn: 'groups',
			pattern: /\/(character|planet)/,
			replacement: '/starwars'
		}]
	}
};
