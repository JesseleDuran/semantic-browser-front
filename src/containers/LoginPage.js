import React, { Component } from "react";
import _get from "lodash/get";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "actions/auth";

class LoginPageContainer extends Component {
	render() {
		const { isLoggedIn } = this.props;
		const location = this.props.location;
		const path = _get(location, "state.from.pathname", "/");
		return isLoggedIn ? <Redirect to={path} /> : this.props.login();
	}
}

const mapStateToProps = state => ({
	isLoggedIn: state.auth.isLoggedIn,
	error: state.auth.error
});

export default connect(
	mapStateToProps,
	{ login }
)(LoginPageContainer);
