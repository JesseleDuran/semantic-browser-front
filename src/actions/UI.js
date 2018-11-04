import * as constants from "./constants";
import ErrorHandler from "ErrorHandler";

export const homePageLoading = loading => dispatch => {
	dispatch({
		type: constants.HOME_PAGE_LOADING,
		payload: {
			loading
		}
	});
};

export const showError = error => dispatch => {
	dispatch({
		type: constants.HOME_PAGE_ERROR,
		payload: {
			error
		}
	});

	setTimeout(() => {
		dispatch({
			type: constants.HOME_PAGE_ERROR,
			payload: {
				error: null
			}
		});
	}, 1000);
};

export const showRequestError = error => dispatch => {
	dispatch(showError(ErrorHandler(error)));
};
