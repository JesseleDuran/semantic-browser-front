import { combineReducers } from "redux";
import * as constants from "../actions/constants";

const selected = (state = null, action) => {
	switch (action.type) {
		case constants.SELECT_STORE:
			return action.payload.store;
		default:
			return state;
	}
};

export default combineReducers({
	selected
});
