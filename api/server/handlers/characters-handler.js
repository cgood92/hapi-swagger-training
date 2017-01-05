'use strict';

const joi = require('joi'),
	boom = require('boom'),
	swapi = require('../data/swapi'),
	transform = require('../transforms/characters-transform');

// Schema: characters
const getAllCharacters = (request, reply) => {
	const { page, limit, sort } =  request.query;
	swapi.characters(page, limit, sort)
		.then(data => transform.characters(data))
		.then(data => reply(data))
		.catch((err = new Error()) => {
			return reply(boom.wrap(err));
		});
};

// Schema: character
const getCharacterByName = (request, reply) => {
	swapi.character(request.params.name)
		.then(data => transform.character(data))
		.then(data => reply(data))
		.catch((err = new Error()) => {
			return reply(boom.wrap(err));
		});
};

const schema = {
	character: joi.object().keys({
		id: joi
			.number()
			.required()
			.integer()
			.min(0)
			.description('id of the character')
			.example(1),
		name: joi
			.string()
			.required()
			.description('name of the character')
			.example('Luke'),
		birth: joi
			.string()
			.required()
			.description('birth year of the character')
			.example('19BBY'),
		gender: joi
			.string()
			.required()
			.valid('male','female','n/a')
			.description('gender of the character')
			.example('male'),
		home: joi
			.string()
			.required()
			.description('home of the character')
			.example('Tatooine'),
		films: joi
			.array()
			.items(
				joi
				.string()
				.required()
				.description('name of film')
				.example('Revenge of the Sith')
			)
	}).label('character'),
	// Using a getter here so that I can refer to `this`, in reference to the character node of the schema object
	get characters () {
		return joi
			.array()
			.items(this.character)
			.label('list_of_characters')
	}
};

module.exports = {
	getAllCharacters,
	getCharacterByName,
	schema
};
