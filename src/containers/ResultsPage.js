import React, { Component } from "react";
import { connect } from "react-redux";
import ResultsPage from "ResultsPage";

class ResultsPageContainer extends Component {

	render = () => {
		return <ResultsPage {...this.props} />;
	};
}

const mapStateToProps = state => ({
	corridors: state.corridors.items,
	loading: state.UI.homePage.loading,
	error: state.UI.homePage.error
});

export default connect(
	mapStateToProps,
)(ResultsPageContainer);
