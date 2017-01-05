'use strict';

const swapi = require('../data/swapi'),
	transform = require('../transforms/characters-transform');

// Schema: characters
const getAllCharacters = (request, reply) => {
	const { page, limit, sort } =  request.query;
	swapi.characters(page, limit, sort)
		.then(data => transform.characters(data))
		.then(data => reply(data))
		.catch((err = new Error()) => {
			return reply().code(500);
		});
};

// Schema: character
const getCharacterByName = (request, reply) => {
	swapi.character(request.params.name)
		.then(data => transform.character(data))
		.then(data => reply(data))
		.catch((err = new Error()) => {
			return reply().code(500);
		});
};

module.exports = {
	getAllCharacters,
	getCharacterByName
};
