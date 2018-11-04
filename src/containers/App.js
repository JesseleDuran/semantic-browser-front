import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ResultsPage from "./ResultsPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import { autoAuth, logout } from "../actions/auth";
import Route from "./Route";
import AuthRoute from "./AuthRoute";
import AuthCallback from "./AuthCallback";
import { getHostname } from "../utils/functions";
import config from "../config";
import PageLoader from "../components/molecules/PageLoader";

class App extends Component {
	componentWillMount = () => {
		this.props.autoAuth();
	};

	render() {
		return (
			<Router>
				<React.Fragment>
					<Switch>
						<AuthRoute exact path="/home" component={HomePage} />
						<Route exact path="/" component={LoginPage} />
						<Route exact path="/callback" component={AuthCallback} />
						<AuthRoute exact path="/search" component={ResultsPage} />
						<Route
							path="/logout"
							component={() => {
								this.props.logout();
								window.location = `${config.logout}${getHostname()}`;
								return <PageLoader active={true} />;
							}}
						/>
					</Switch>
				</React.Fragment>
			</Router>
		);
	}
}

export default connect(
	null,
	{
		autoAuth,
		logout
	}
)(App);
