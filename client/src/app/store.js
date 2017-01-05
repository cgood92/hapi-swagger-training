import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import thunk from 'redux-thunk';
import isBrowser from 'is-in-browser';

import {ALLOW_REDUX_DEV_TOOLS} from './env.js';

import system, * as fromSystem from './reducers/system.js';
import characters, * as fromCharacters from './reducers/characters.js';
import user, * as fromUser from './reducers/user.js';

// create the master reducer
const rootReducer = combineReducers({system, characters, user});

// Reexport scoped selectors here:
export const selectUser = (state) => (
	fromUser.selectUser(state.user)
);

export const selectCharacters = (state) => (
	fromCharacters.selectCharacters(state.characters)
);

export const selectHTTPResponseCode = (state) => (
	fromSystem.selectHTTPResponseCode(state.system)
);

export const selectAllApplicationErrors = (state) => (
	fromSystem.selectAllApplicationErrors(state.system)
);

export const selectApplicationError = (state, id) => (
	fromSystem.selectApplicationError(state.system, id)
);

// determine initial state
const initialState = isBrowser && window.__INITIAL_STATE__ || {};

const reduxMiddleware = compose(
	applyMiddleware(thunk),
	autoRehydrate(),
	isBrowser && ALLOW_REDUX_DEV_TOOLS==="1" && typeof window.devToolsExtension !== "undefined" ? window.devToolsExtension() : f => f
);

// export a store creator factory with initial state if present...
const store = createStore( rootReducer, initialState, reduxMiddleware );
persistStore(store);
export default store;
