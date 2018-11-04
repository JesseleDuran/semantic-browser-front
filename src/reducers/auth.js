import * as constants from "../actions/constants";

const initialState = {
	isLoggedIn: false,
	user: {},
	accessToken: "",
	error: null
};

export default function auth(state = initialState, action) {
	switch (action.type) {
		case constants.LOGIN_FAIL:
			return {
				...state,
				error: action.payload.error,
				isLoggedIn: false
			};
		case constants.LOGOUT:
			return initialState;
		case constants.LOGIN_SUCCESS:
			const { accessToken, user } = action.payload;
			return {
				...state,
				isLoggedIn: true,
				user,
				accessToken
			};
		default:
			return state;
	}
}
