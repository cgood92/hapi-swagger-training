'use strict';

const boom = require('boom'),
	joi = require('joi'),
	swapi = require('../data/swapi'),
	transform = require('../transforms/planets-transform');

// Schema: planets
const getAllPlanets = (request, reply) => {
	swapi.residents()
		.then(data => reply(data))
		.catch((err = new Error()) => {
			return reply(boom.wrap(err));
		});
};

// Schema: planetsV2
const getAllPlanetsAndFetchUrls = (request, reply) => {
	swapi.residents()
		.then(data => transform.planets(data))
		.then(data => reply(data))
		.catch((err = new Error()) => {
			return reply(boom.wrap(err));
		});
};

const schema = {
	planet: joi.object().keys({
			climate: joi
				.string()
				.required()
				.description('climate of planet')
				.example('Arid'),
			diameter: joi
				.string()
				.required()
				.description('diameter of planet')
				.example('10465'),
			films: joi
				.array()
				.items(
					joi
					.string()
					.uri()
					.description('uri for film')
					.example('http://swapi.co/api/films/1/')
				).label('url'),
			gravity: joi
				.string()
				.required()
				.description('gravity of planet')
				.example('1'),
			name: joi
				.string()
				.required()
				.description('name of planet')
				.example('Tatooine'),
			orbital_period: joi
				.string()
				.required()
				.description('orbital_period of planet')
				.example('304'),
			population: joi
				.string()
				.required()
				.description('population of planet')
				.example('120000'),
			residents: joi
				.array()
				.items(
					joi
					.string()
					.uri()
					.description('uri for character')
					.example('http://swapi.co/api/people/1/')
				).label('url'),
			rotation_period: joi
				.string()
				.required()
				.description('rotation_period of planet')
				.example('23'),
			surface_water: joi
				.string()
				.required()
				.description('surface_water of planet')
				.example('1'),
			terrain: joi
				.string()
				.required()
				.description('terrain of planet')
				.example('Dessert')
		}).unknown(true).label('planet'),
	// Using a getter here so that I can refer to `this`, in reference to the planet node of the schema object
	get planets () {
		return joi
			.array()
			.items(this.planet)
			.label('list_of_planets')
	},
	planetV2: joi.object().keys({
			climate: joi
				.string()
				.required()
				.description('climate of planet')
				.example('Arid'),
			diameter: joi
				.string()
				.required()
				.description('diameter of planet')
				.example('10465'),
			films: joi
				.array()
				.items(
					joi
					.string()
					// Here lies the difference between V1 and V2
					.description('title')
					.example('Revenge of the Sith')
				).label('films'),
			gravity: joi
				.string()
				.required()
				.description('gravity of planet')
				.example('1'),
			name: joi
				.string()
				.required()
				.description('name of planet')
				.example('Tatooine'),
			orbital_period: joi
				.string()
				.required()
				.description('orbital_period of planet')
				.example('304'),
			population: joi
				.string()
				.required()
				.description('population of planet')
				.example('120000'),
			residents: joi
				.array()
				.items(
					joi
					.string()
					// Here lies the difference between V1 and V2
					.description('character name')
					.example('Bail Prestor Organa')
				).label('residents'),
			rotation_period: joi
				.string()
				.required()
				.description('rotation_period of planet')
				.example('23'),
			surface_water: joi
				.string()
				.required()
				.description('surface_water of planet')
				.example('1'),
			terrain: joi
				.string()
				.required()
				.description('terrain of planet')
				.example('Dessert')
		}).unknown(true).label('planetV2'),
	// Using a getter here so that I can refer to `this`, in reference to the planet node of the schema object
	get planetsV2 () {
		return joi
			.array()
			.items(this.planetV2)
			.label('list_of_planetsV2')
	}
};

module.exports = {
	getAllPlanets,
	getAllPlanetsAndFetchUrls,
	schema
};
