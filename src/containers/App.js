import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ResultsPage from "containers/ResultsPage";
import HomePage from "containers/HomePage";
import { autoAuth } from "actions/auth";
import Route from "containers/Route";

class App extends Component {
	componentWillMount = () => {
		this.props.autoAuth();
	};

	render() {
		return (
			<Router>
				<React.Fragment>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/search" component={ResultsPage} />
					</Switch>
				</React.Fragment>
			</Router>
		);
	}
}

export default connect(
	null,
	{
		autoAuth
	}
)(App);
