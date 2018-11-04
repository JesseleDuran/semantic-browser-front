import React from "react";
import SearchForm from "../organisms/SearchForm"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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

	render() {
		return (
			<SearchForm/>
		);
	}
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(HomePage);
