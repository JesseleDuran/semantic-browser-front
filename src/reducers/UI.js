import { combineReducers } from "redux";
import * as constants from "../actions/constants";

const homePageInitialState = {
	loading: false,
	error: null
};

const homePage = (state = homePageInitialState, action) => {
	switch (action.type) {
		case constants.HOME_PAGE_LOADING:
			return { ...state, loading: action.payload.loading };
		case constants.HOME_PAGE_ERROR:
			return { ...state, error: action.payload.error };
		default:
			return state;
	}
};

export default combineReducers({
	homePage
});
