import * as constants from "./constants";
import { getLikes } from "../api/favs";

export const addFav = fav => dispatch => {
	dispatch({
		type: constants.ADD_FAV,
		payload: [fav]
	});
};

export const removeFav = id => dispatch => {
	dispatch({
		type: constants.REMOVE_FAV,
		payload: {
			id
		}
	});
};

export const loadFavs = userId => dispatch => {
	getLikes(userId).then(likes => {
		dispatch({
			type: constants.ADD_FAV,
			payload: likes
		});
	});
};
