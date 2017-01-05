'use strict';

const swapi = require('../data/swapi');

const processOneCharacter = (person) => {
	return new Promise((resolve, reject) => {
		// Go and fetch the urls present
		const fetches = [person.homeworld].concat(person.films).map((url) => {
			return swapi.url(url);
		});
		Promise.all(fetches).then((results) => {
			const home = results.shift(0).name;
			const filmTitles = results.map((film) => film.title);
			return resolve({
				id: parseInt(person.url.match(/\d+/)[0]),
				name: person.name,
				birth: person.birth_year,
				gender: person.gender,
				home,
				films: filmTitles
			});
		}).catch((err) => reject(err));
	});
};

const character = (raw) => {
	return new Promise((resolve, reject) => {
		const person = raw.results[0];
		if (person) {
			return processOneCharacter(person).then(person => resolve(person));
		} else {
			return reject();
		}
	});
};

const characters = (raw) => {
	return new Promise((resolve, reject) => {
		return Promise.all(raw.map(processOneCharacter)).then(characters => resolve(characters));
	});
};


module.exports = {
	character,
	characters
};
