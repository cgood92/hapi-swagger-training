'use strict';

const handlers = require('../handlers');

/*

ROUTES NOTES:

*/

// Passing in server
const routes = (server) => [{
	method: 'GET',
	path: '/api/v1/characters',
	config: {
		handler: handlers.characters.getAllCharacters,
		description: 'Gets all the Star Wars characters'
	}
},{
	method: 'GET',
	path: '/api/v1/character/{name}',
	config: {
		handler: handlers.characters.getCharacterByName,
		description: 'Gets info on a single Star Wars character'
	}
}];

module.exports = routes;
