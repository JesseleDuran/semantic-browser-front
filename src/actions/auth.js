import * as constants from "./constants";
import Auth0 from "../services/auth0";
import { loadFavs } from "./fav";

export const login = () => dispatch => {
	const auth0 = new Auth0();
	auth0.login();
};

export const onLogin = ({ accessToken, idToken, expiresAt }) => dispatch => {
	const auth0 = new Auth0();
	auth0
		.getProfile(accessToken)
		.then(user => dispatch(setAuth({ user, accessToken, idToken, expiresAt })))
		.catch(error => dispatch(loginFail(error)));
};

export const autoAuth = () => dispatch => {
	const user = JSON.parse(localStorage.getItem("user"));
	const accessToken = localStorage.getItem("accessToken");
	const idToken = localStorage.getItem("idToken");
	const expiresAt = localStorage.getItem("expiresAt");
	if (user && accessToken && idToken && expiresAt) {
		dispatch(loginSuccess({ accessToken, user }));
	}
};

export const setAuth = ({
	accessToken,
	idToken,
	user,
	expiresAt
}) => dispatch => {
	localStorage.setItem("accessToken", accessToken);
	localStorage.setItem("idToken", idToken);
	localStorage.setItem("expiresAt", expiresAt);
	localStorage.setItem("user", JSON.stringify(user));
	dispatch(loginSuccess({ accessToken, user }));
};

const loginSuccess = payload => dispatch => {
	dispatch(loadFavs(payload.user.sub));
	dispatch({
		type: constants.LOGIN_SUCCESS,
		payload
	});
};

export const loginFail = error => dispatch => {
	dispatch({
		type: constants.LOGIN_FAIL,
		payload: { error }
	});
};

export const logout = () => dispatch => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("idToken");
	localStorage.removeItem("expiresAt");
	localStorage.removeItem("user");
	dispatch({ type: constants.LOGOUT });
};
