import _ from 'lodash/array';

export const RECEIVE_CHARACTERS = "RECEIVE_CHARACTERS";
export const RECEIVE_VOTES = "RECEIVE_VOTES";

const findUser = (id) => (item) => item.id === id;

export default function(state = [], {type, data = {} } ) {
	switch(type) {
		case RECEIVE_CHARACTERS:
			return _.uniqBy(state.concat(data.characters || []), item => item.id);
		case RECEIVE_VOTES:
			let newState = JSON.parse(JSON.stringify(state)),
				{ up, down, id } = data;
			id = parseInt(id);
			let target = newState.find(findUser(id));
			if (target) {
				target.votes = {
					up: up.users.length,
					down: down.users.length
				};
				target.votesLoaded = true;
			}
			return newState;

		default:
			return state;
	}
}

export const selectCharacters = (state) => ({characters: state.characters});
