import React from "react";
import SearchForm from "../organisms/SearchForm";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PrincipalAppBar from "../molecules/PrincipalAppBar";

const styles = theme => ({
	parent: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "auto",
		minHeight: "600px"
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

	onLucky = () => {
		const { query } = this.state;
		this.props.history.push({
			pathname: "/search",
			search: `query=${query}`,
			feelingLucky: true,
			query
		});
	};

	render() {
		const { isLoggedIn, classes } = this.props;
		return [
			<PrincipalAppBar isLoggedIn={isLoggedIn} />,
			<div className={classes.parent}>
				<SearchForm
					onChange={this.onSearchChange}
					search={this.onSearch}
					onLucky={this.onLucky}
				/>
			</div>
		];
	}
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles, { withTheme: true })(HomePage));
