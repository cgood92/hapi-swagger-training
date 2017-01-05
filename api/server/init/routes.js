'use strict';

const joi = require('joi'),
	handlers = require('../handlers');

/*

ROUTES NOTES:

Validation:
	- Use the validation to validate the incoming request's query, params, and payload

Response Schema:
	- Validates the outgoing response, making sure it contains all of the appropriate object keys and types

*/

// Passing in server
const routes = (server) => [{
	method: 'GET',
	path: '/api/v1/characters',
	config: {
		handler: handlers.characters.getAllCharacters,
		description: 'Gets all the Star Wars characters',
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
}];

module.exports = routes;
