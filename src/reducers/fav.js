import * as constants from "../actions/constants";

export default (state = [], action) => {
	switch (action.type) {
		case constants.ADD_FAV:
			return [...state, action.payload];
		case constants.REMOVE_FAV:
			return state.filter(f => f.link != action.payload.link);
		default:
			return state;
	}
};
