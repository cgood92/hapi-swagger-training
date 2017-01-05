'use strict';

const joi = require('joi'),
	handlers = require('../handlers');

/*

ROUTES NOTES:

Tags: 
	- Use the 'api' tag to have routes show up in the swagger-ui view

Validation:
	- Use the validation to validate the incoming request's query, params, and payload

Response Schema:
	- Validates the outgoing response, making sure it contains all of the appropriate object keys and types

*/

// Passing in server
const routes = (server) => [{
	method: 'GET',
	path: '/api/v1/characters',
	tags: ['api', 'v1', 'starwars'],
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
	tags: ['api', 'v1', 'starwars'],
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
}];

module.exports = routes;
