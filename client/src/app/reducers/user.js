export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

const initialState = { isLoggedIn: false };

export default function(state = initialState, { type, data = {} } ) {
	switch(type) {
		case LOG_IN: 
			if (data && data.id) {
				const newState = Object.assign({}, data, { isLoggedIn: true });
				return newState;
			} else {
				return state;
			}
		case LOG_OUT:
			return initialState;
		default:
			return state;
	}
}

export const selectUser = (state) => ({user: state.user});
