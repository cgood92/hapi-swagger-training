import {RECEIVE_CHARACTERS } from '../reducers/characters.js';
import * as api from '../services/api';

function setCharacters( characters=[] ) {
	return { type: RECEIVE_CHARACTERS, data: { characters } };
}

export const init = () => (dispatch) => (
	api.getCharacters()
		.then(json => dispatch(setCharacters(json)) )
		.catch(err => {
			console.log('Getting characters failed...');
		})
);
