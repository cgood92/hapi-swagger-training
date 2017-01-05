'use strict';

const swapi = require('../data/swapi');

const planets = (planets = []) => {
	return new Promise((resolve, reject) => {
		const promises = [];

		// Go and fetch the urls present
		planets.forEach((planet) => {

			// Swap out resident URLs for resident names
			(planet.residents || []).forEach((residentUrl, index) => {
				promises.push(swapi.url(residentUrl).then((person) => {
					planet.residents[index] = person.name;
				}));
			});

			// Swap out film URLs for film titles
			(planet.films || []).forEach((filmUrl, index) => {
				promises.push(swapi.url(filmUrl).then((film) => {
					planet.films[index] = film.title;
				}));
			});

			// Delete properties not needed
			delete planet.url;
			delete planet.created;
			delete planet.edited;
		});

		Promise.all(promises).then(() => {
			resolve(planets);
		}).catch((err) => reject(err));
	});
};

module.exports = {
	planets	
};
