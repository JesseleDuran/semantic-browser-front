import { combineReducers } from "redux";
import * as constants from "../actions/constants";

const items = (state = [], action) => {
	switch (action.type) {
		case constants.ADD_CORRIDORS:
			return [...action.payload.items];
		default:
			return state;
	}
};

export default combineReducers({
	items
});
