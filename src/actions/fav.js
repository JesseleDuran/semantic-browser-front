import * as constants from "./constants";
import { getLikes } from "../api/favs";

export const addFav = fav => dispatch => {
	dispatch({
		type: constants.ADD_FAV,
		payload: fav
	});
};

export const removeFav = link => dispatch => {
	dispatch({
		type: constants.REMOVE_FAV,
		payload: {
			link
		}
	});
};

export const loadFavs = userId => dispatch => {
	getLikes(userId).then(likes => likes.forEach(i => dispatch(addFav(i))));
};
