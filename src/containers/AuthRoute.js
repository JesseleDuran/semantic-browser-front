import React from "react";
import Route from "./Route";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

const AuthRoute = ({ isLoggedIn, ...rest }) => {
	return isLoggedIn ? (
		<Route {...rest} />
	) : (
		<Redirect to={{ pathname: "/", state: { from: rest.location } }} />
	);
};

const mapStateToProps = state => ({
	isLoggedIn: state.auth.isLoggedIn
});

const container = compose(
	withRouter,
	connect(mapStateToProps)
);

export default container(AuthRoute);
