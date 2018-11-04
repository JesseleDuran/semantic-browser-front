import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import auth from "./auth";
import user from "./user";
import store from "./store";
import UI from "./UI";
import corridors from "./corridors";

const rootReducer = combineReducers({
	form,
	auth,
	user,
	corridors,
	UI,
	store
});

export default rootReducer;
