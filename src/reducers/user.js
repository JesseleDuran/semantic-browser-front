import { combineReducers } from "redux";
import assign from "lodash/assign";
import merge from "lodash/merge";
import * as constants from "../actions/constants";

const byId = (state = {}, action) => {
	switch (action.type) {
		case constants.LOGIN_SUCCESS:
			return { ...state, ...action.payload.user };
		default:
			return state;
	}
};

// NOTE: Might not be used, the allIds array is used to keep track of
// ordering of the entities (as objects do not preserve order for the keys)
// if this happens to be needed we can map (using lodash) the users and return
// their ids
const allIds = (state = [], action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default combineReducers({ byId, allIds });
