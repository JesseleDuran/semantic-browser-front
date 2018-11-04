import React from "react";
import SearchForm from "../organisms/SearchForm";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	appFrame: {
		height: "auto",
		zIndex: 1,
		overflow: "hidden",
		position: "relative",
		display: "flex",
		width: "100%"
	},
	hide: {
		display: "none"
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,

		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
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
		const { isLoggedIn } = this.props;
		return [
			<SearchForm onChange={this.onSearchChange} search={this.onSearch} />,
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
