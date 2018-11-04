import React from "react";
import SearchForm from "../organisms/SearchForm";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PrincipalAppBar from "../molecules/PrincipalAppBar"

const styles = theme => ({
	parent: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "auto",
		minHeight: "600px",
	}
});

class HomePage extends React.Component {
	state = {
		query: ""
	};

	onSearchChange = query => this.setState({ query });

	onSearch = () => {
		const { query } = this.state;
		this.props.history.push({
			pathname: "/search",
			search: `query=${query}`,
			query
		});
	};

	render() {
		const { isLoggedIn, classes } = this.props;
		return [
			<PrincipalAppBar></PrincipalAppBar>,
			<div className={classes.parent} >
				<SearchForm onChange={this.onSearchChange} search={this.onSearch} />
			</div>,
			<Button href="/login" disabled={isLoggedIn}>
				Loguearse
			</Button>,
			<Button href="/logout" disabled={!isLoggedIn}>
				Logout
			</Button>
		];
	}
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles, { withTheme: true })(HomePage));
