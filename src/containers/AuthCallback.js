import React, { Component } from "react";
import _get from "lodash/get";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth0 from "../services/auth0";
import { onLogin, loginFail } from "actions/auth";
import PageLoader from "PageLoader";
class AuthCallback extends Component {
	handleAuth = () => {
		if (!this.props.isLoggedIn) {
			const auth0 = new Auth0();
			auth0
				.handleAuthentication()
				.then(session => this.props.onLogin(session))
				.catch(error => this.props.loginFail(error));
		}
	};

	render() {
		const { isLoggedIn, error } = this.props;
		this.handleAuth();
		const location = this.props.location;
		const path = !error
			? _get(location, "state.from.pathname", "/home")
			: "/login";
		return isLoggedIn ? <Redirect to={path} /> : <PageLoader active={true} />;
	}
}

const mapStateToProps = state => ({
	isLoggedIn: state.auth.isLoggedIn,
	error: state.auth.error
});

export default connect(
	mapStateToProps,
	{
		onLogin,
		loginFail
	}
)(AuthCallback);
