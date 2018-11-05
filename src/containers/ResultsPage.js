import React, { Component } from "react";
import { connect } from "react-redux";
import ResultsPage from "../components/pages/ResultsPage";
import { withRouter } from "react-router-dom";
import { search } from "../api/googleAPI";
import { addLike } from "../api/favs";
import { replaceAll } from "../utils/functions";

const typeMap = {
	0: null,
	1: "image"
};

class ResultsPageContainer extends Component {
	state = {
		query: "",
		searchType: null,
		results: null,
		tab: 0
	};

	getQuery = paramString => {
		const params = new URLSearchParams(paramString);
		return params.get("query");
	};

	onQueryChange = query => this.setState({ query });

	search = lucky => {
		this.setState({ results: null }, () => this.onSearch(lucky));
	};

	formatQueryIfNeeded = query => {
		const formatedOrs = replaceAll(query, " o ", " OR ");
		return replaceAll(formatedOrs, " y ", " AND ");
	};

	goToFirstPage = items => {
		window.location = items[0].link;
	};

	onSearch = feelingLucky => {
		/*const { query, searchType } = this.state;
		search({
			q: this.formatQueryIfNeeded(query),
			searchType
		})
			.then(results => {
				if (feelingLucky) this.goToFirstPage(results.items);
				this.setState({ results });
			})
			.catch(err => {
				console.log("HEY", err);
			});*/
	};

	like = () => {
		/*const { query, searchType } = this.state;
		search({
			q: this.formatQueryIfNeeded(query),
			searchType
		})
			.then(results => {
				this.setState({ results });
			})
			.catch(err => {
				console.log("HEY", err);
			});*/
	};

	componentWillMount() {
		let {
			location: { query, feelingLucky },
			location
		} = this.props;
		query = query ? query : this.getQuery(location.search);
		this.setState({ query }, () => this.search(feelingLucky));
	}

	tabChange = tab => {
		this.setState({ tab, searchType: typeMap[tab] }, this.onSearch);
	};

	render = () => {
		const { query, results, tab } = this.state;
		return (
			<ResultsPage
				onTabChange={this.tabChange}
				tab={tab}
				query={query}
				search={this.search}
				results={results}
				onChange={this.onQueryChange}
				isLoggedIn={this.props.isLoggedIn}
			/>
		);
	};
}

const mapStateToProps = state => ({
	loading: state.UI.homePage.loading,
	error: state.UI.homePage.error,
	isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(withRouter(ResultsPageContainer));
