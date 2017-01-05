'use strict';

const joi = require('joi'),
	handlers = require('../handlers'),
	auth = require('../modules/auth');

/*

ROUTES NOTES:

Tags: 
	- Use the 'api' tag to have routes show up in the swagger-ui view
	- Use the 'socket' tag to register that route as a `Nes` socket subscription

Auth:
	- Authentication has been enabled by default to all routes, unless specified otherwise with an `auth` node of the `config` for the route (ie `auth: false`)

Validation:
	- Use the validation to validate the incoming request's query, params, and payload

Response Schema:
	- Validates the outgoing response, making sure it contains all of the appropriate object keys and types

Versions:
	- Include the version in the path, and the module hapi-api-version should take care of the rest

*/

// Passing in server, mostly to deal with server.publish in the different handlers
const routes = (server) => [{
	method: 'GET',
	path: '/api/v1/characters',
	config: {
		handler: handlers.characters.getAllCharacters,
		description: 'Gets all the Star Wars characters',
		tags: ['api', 'v1', 'starwars'],
		validate: {
			query: {
				page: joi
					.number()
					.integer()
					.min(0)
					.default(1)
					.description('page number of results'),
				limit: joi
					.number()
					.integer()
					.min(0)
					.default(10)
					.description('number of results to show per page'),
				sort: joi
					.string()
					.default("name")
					.description('the key on which to sort results')
			}
		},
		response: {
			schema: handlers.characters.schema.characters
		}
	}
},{
	method: 'GET',
	path: '/api/v1/character/{name}',
	config: {
		handler: handlers.characters.getCharacterByName,
		description: 'Gets info on a single Star Wars character',
		tags: ['api', 'v1', 'starwars'],
		validate: {
			params: {
				name: joi
					.string()
					.required()
					.description('the name of Star Wars character')
			}
		},
		response: {
			schema: handlers.characters.schema.character
		}
	}
},{
	method: 'GET',
	path: '/api/v1/planets',
	config: {
		handler: handlers.planets.getAllPlanets,
		description: 'Gets all the Star Wars planets',
		tags: ['api', 'v1', 'starwars'],
		response: {
			schema: handlers.planets.schema.planets
		}
	}
},{
	method: 'GET',
	path: '/api/v2/planets',
	config: {
		handler: handlers.planets.getAllPlanetsAndFetchUrls,
		description: 'Gets all the Star Wars planets, and swap out URL\'s for useful data',
		tags: ['api', 'v2', 'starwars'],
		response: {
			schema: handlers.planets.schema.planetsV2
		}
	}
},{
	// A lively debate could be stirred up as to whether this endpoint should be a POST or a GET.  There are some arguments that a POST should be used when handling sensitive data.  I haven't made up my own opinion about this yet, and so I am going to simply leave this as a GET, with the understanding that there may be a better practice out there.
	method: 'GET',
	path: '/api/v1/user',
	config: {
		handler: handlers.user.getUser,
		description: 'Get the user object from the database',
		tags: ['api', 'v1', 'user'],
		validate: {
			query: {
				username: joi
					.string()
					.required()
					.description('username'),
				password: joi
					.string()
					.required()
					.description('password')
			}
		},
		response: {
			schema: handlers.user.schema.user
		},
		auth: false
	}
},{
	method: 'POST',
	path: '/api/v1/user',
	config: {
		handler: handlers.user.newUser,
		description: 'Post a new user object to the database',
		tags: ['api', 'v1', 'user'],
		validate: {
			payload: {
				username: joi
					.string()
					.required()
					.description('username'),
				password: joi
					.string()
					.required()
					.description('password'),
				scope: joi
					.string()
					.valid(auth.scopes)
					.description('scope')
			}
		},
		response: {
			schema: handlers.user.schema.user
		},
		// Only allow ADMIN's to have access to this route.  In the database there should be a node on the user to indicate their scope.  Valid scopes can be found in ../handlers/auth.js.
		auth: {
			scope: ['ADMIN']
		}
	}
},{
	method: 'GET',
	path: '/api/v1/vote/{id}',
	config: {
		handler: handlers.votes.getVotesForCharacterById,
		description: 'Gets all the votes for a Star Wars character',
		tags: ['api', 'v1', 'vote', 'socket'],
		validate: {
			params: {
				id: joi
					.string()
					.required()
					.description('id of star wars character')
			}
		},
		response: {
			schema: handlers.votes.schema.get
		}
	}
},{
	method: 'DELETE',
	path: '/api/v1/vote/{id}',
	config: {
		handler: handlers.votes.deleteVoteForCharacterById,
		description: 'Deletes the user\'s vote for a Star Wars character',
		tags: ['api', 'v1', 'vote'],
		validate: {
			params: {
				id: joi
					.string()
					.required()
					.description('id of star wars character')
					.example('1')
			}
		},
		response: {
			schema: handlers.votes.schema.delete
		}
	}
},{
	method: 'POST',
	path: '/api/v1/vote/{id}',
	config: {
		handler: handlers.votes.postVoteForCharacterById(server),
		description: 'Post a user\'s vote for a Star Wars character',
		tags: ['api', 'v1', 'vote'],
		validate: {
			params: {
				id: joi
					.string()
					.required()
					.description('id of star wars character')
			},
			payload: {
				type: joi
					.string()
					.valid('up','down')
					.required()
					.description('is this an up vote or down vote')
			}
		},
		response: {
			schema: handlers.votes.schema.post
		}
	}
}];

module.exports = routes;
