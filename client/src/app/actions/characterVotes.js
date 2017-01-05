import {RECEIVE_VOTES } from '../reducers/characters.js';
import * as api from '../services/api';

function setCharacterVotes( { id, up = { users: [] }, down = { users: [] } } ) {
	return { type: RECEIVE_VOTES, data: { id, up, down } };
}

export const init = (dispatch, id) => {
	api.getCharacterVotes(id, (json) => dispatch(setCharacterVotes(json)));
};
