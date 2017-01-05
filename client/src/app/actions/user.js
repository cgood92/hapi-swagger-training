import { LOG_IN, LOG_OUT } from '../reducers/user.js';

const btoa = btoa || require('btoa');

export const login = ( user = {}, username, password ) => {
	const auth = btoa(`${username}:${password}`);
	return { type: LOG_IN, data: { ...user, auth } };
}

export const logout = () => {
	return { type: LOG_OUT };
}
