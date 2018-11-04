import React, { Component } from "react";
import { connect } from "react-redux";
import ResultsPage from "../components/pages/ResultsPage";
import { withRouter } from "react-router-dom";

const data = [
	{
		kind: "customsearch#result",
		title: "Essentials of the Java Programming Language, Part 1",
		htmlTitle: "Essentials of the <b>Java Programming</b> Language, Part 1",
		link: "https://www.oracle.com/technetwork/java/index-138747.html",
		displayLink: "www.oracle.com",
		snippet:
			"If you are new to programming in the Java language, have some experience with \nother languages, and are familiar with things like displaying text or graphics or ...",
		htmlSnippet:
			"If you are new to <b>programming</b> in the <b>Java</b> language, have some experience with <br>\nother languages, and are familiar with things like displaying text or graphics or&nbsp;...",
		cacheId: "G7u1tM1EFegJ",
		formattedUrl: "https://www.oracle.com/technetwork/java/index-138747.html",
		htmlFormattedUrl:
			"https://www.oracle.com/technetwork/<b>java</b>/index-138747.html",
		pagemap: {
			metatags: [
				{
					title: "Essentials of the Java Programming Language, Part 1",
					country: "USA",
					language: "en",
					"updated date": "8/26/13 4:47 PM"
				}
			]
		}
	},
	{
		kind: "customsearch#result",
		title: "Java (programming language) - Wikipedia",
		htmlTitle: "<b>Java</b> (<b>programming</b> language) - Wikipedia",
		link: "https://en.wikipedia.org/wiki/Java_(programming_language)",
		displayLink: "en.wikipedia.org",
		snippet:
			"Java is a general-purpose computer-programming language that is concurrent, \nclass-based, object-oriented, and specifically designed to have as few ...",
		htmlSnippet:
			"<b>Java</b> is a general-purpose computer-<b>programming</b> language that is concurrent, <br>\nclass-based, object-oriented, and specifically designed to have as few&nbsp;...",
		cacheId: "ty8cA0ylPEMJ",
		formattedUrl: "https://en.wikipedia.org/wiki/Java_(programming_language)",
		htmlFormattedUrl:
			"https://en.wikipedia.org/wiki/<b>Java</b>_(<b>programming</b>_language)",
		pagemap: {
			cse_thumbnail: [
				{
					width: "166",
					height: "304",
					src:
						"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTTkd-KfsXtxIbwamVrMSuOjYm8ZFHt05veHuXwVV4RF9aF0Yc3FJeFpQw"
				}
			],
			metatags: [
				{
					referrer: "origin",
					"og:image":
						"https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png"
				}
			],
			cse_image: [
				{
					src:
						"https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png"
				}
			]
		}
	}
];

class ResultsPageContainer extends Component {
	state = {
		query: "",
		results: []
	};

	getQuery = paramString => {
		const params = new URLSearchParams(paramString);
		return params.get("query");
	};

	onQueryChange = query => this.setState({ query });

	search = () => {
		this.setState({ results: [] }, this.onSearch);
	};

	onSearch = () => {
		const { query } = this.state;
		setTimeout(() => {
			this.setState({ results: data });
		}, 1500);
	};

	componentDidMount() {
		let {
			location: { query },
			location
		} = this.props;

		query = query ? query : this.getQuery(location.search);
		this.setState({ query }, this.search);
	}

	render = () => {
		const { query, results } = this.state;
		return (
			<ResultsPage
				query={query}
				search={this.search}
				results={results}
				onChange={this.onQueryChange}
			/>
		);
	};
}

const mapStateToProps = state => ({
	loading: state.UI.homePage.loading,
	error: state.UI.homePage.error
});

export default connect(mapStateToProps)(withRouter(ResultsPageContainer));
