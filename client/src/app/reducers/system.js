import {combineReducers} from 'redux';

export const RECEIVE_HTTP_RESPONSE_CODE = "RECEIVE_HTTP_RESPONSE_CODE";
export const RECEIVE_HTTP_RESPONSE_CODE_RESET = "RECEIVE_HTTP_RESPONSE_CODE_RESET";

export const RECEIVE_APPLICATION_ERROR_RESET = "RECEIVE_APPLICATION_ERROR_RESET";
export const RECEIVE_APPLICATION_ERROR = "RECEIVE_APPLICATION_ERROR";
export const RECEIVE_APPLICATION_ERROR_REMOVAL = "RECEIVE_APPLICATION_ERROR_REMOVAL";

export const RECEIVE_LOADING_START = "RECEIVE_LOADING_START";
export const RECEIVE_LOADING_END = "RECEIVE_LOADING_END";


const httpResponse = (state = 200, { type, payload: httpCode } ) => {
	switch(type) {

		case RECEIVE_HTTP_RESPONSE_CODE: {
			return httpCode;
		}

		case RECEIVE_HTTP_RESPONSE_CODE_RESET: {
			return 200;
		}

		default: {
			return state;
		}
	}
};

const errors = (state = {}, {type, payload}) => {
	switch(type) {
		case RECEIVE_APPLICATION_ERROR_RESET: {
			return {};
		}

		case RECEIVE_APPLICATION_ERROR: {
			const {id, title, details, date} = payload;
			return {
				...state,
				[id]: {id, title, details, date}
			};
		}

		case RECEIVE_APPLICATION_ERROR_REMOVAL: {
			const { id } = payload;
			const newState = {...state};
			delete newState[id];
			return newState;
		}

		default:
			return state;
	}
}

const working = (state = false, {type}) => {
	switch(type) {
		case RECEIVE_LOADING_START: {
			return true;
		}

		case RECEIVE_LOADING_END: {
			return false;
		}

		default:
			return state;
	}
};



export default combineReducers({httpResponse, errors, working});


/*SELECTOR(S)*/
export const selectHTTPResponseCode = (state) => state.httpResponse;

export const selectAllApplicationErrors = (state) => (
	Object.keys(state.errors)
		.map((key) => state.errors[key])
);

export const selectApplicationError = (state, id) => (
	state.errors[id]
);

export const selectSystemWorking = (state) => state.working;
