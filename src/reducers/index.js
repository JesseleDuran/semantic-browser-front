import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import auth from "./auth";
import user from "./user";
import UI from "./UI";
import fav from "./fav";

const rootReducer = combineReducers({
	form,
	auth,
	user,
	fav,
	UI
});

export default rootReducer;
