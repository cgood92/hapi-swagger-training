import store from '../store';

const base = 'http://localhost:7777/api/v1',
	socketBase = 'ws://localhost:7777';
const getAuth = () => ({ 'Authorization': 'Basic ' +  store.getState().user.auth});

export const getCharacters = () => {
	return fetch(`${base}/characters`, { 
			method: 'GET',
			headers: {
				...getAuth()
			}
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			}
		});
};

export const getCharacterVotes = (id, handler) => {
	return fetch(`${base}/vote/${id}`, { 
			method: 'GET',
			headers: {
				...getAuth()
			}
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			}
		});
};

export const voteForCharacter = (id,type) => {
	return fetch(`${base}/vote/${id}`, { 
			method: 'POST',
			headers: {
				...getAuth()
			},
			body: JSON.stringify({
				type
			})
		});
};

export const login = (username,password) => {
	return fetch(`${base}/user?username=${username}&password=${password}`, { 
			method: 'GET'
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			}
		});
};
