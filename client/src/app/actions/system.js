import {
	RECEIVE_HTTP_RESPONSE_CODE,
	RECEIVE_HTTP_RESPONSE_CODE_RESET,
	RECEIVE_APPLICATION_ERROR_RESET,
	RECEIVE_APPLICATION_ERROR,
	RECEIVE_APPLICATION_ERROR_REMOVAL
} from '../reducers/system.js';

export const setHttpResponseCode = (code) => ({
	type: RECEIVE_HTTP_RESPONSE_CODE,
	payload: code
});

export const resetHttpResponseCode = () => ({
	type: RECEIVE_HTTP_RESPONSE_CODE_RESET
});

export const resetApplicationErrors = () => ({
	type: RECEIVE_APPLICATION_ERROR_RESET
});

export const addApplicationError = ({id, title, description, date}) => ({
	type: RECEIVE_APPLICATION_ERROR,
	payload: {id, title, description, date}
});

export const removeApplicationError = ({id}) => ({
	type: RECEIVE_APPLICATION_ERROR_REMOVAL,
	payload: {id}
});
