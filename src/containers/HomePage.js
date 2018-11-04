import React, { Component } from "react";
import { connect } from "react-redux";
import HomePage from "HomePage";
import { logout } from "actions/auth";
import { showError } from "actions/UI";

class HomePageContainer extends Component {

	logout = () => {
		this.props.logout();
	};

	render = () => {
		return <HomePage {...this.props} />;
	};
}

const mapStateToProps = state => ({
	corridors: state.corridors.items,
	loading: state.UI.homePage.loading,
	error: state.UI.homePage.error
});

export default connect(
	mapStateToProps,
	{ logout, showError }
)(HomePageContainer);
