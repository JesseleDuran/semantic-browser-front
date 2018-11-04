import React, { Component } from "react";
import BrowserTitle from "../atoms/BrowserTitle";
import SearchInput from "../molecules/SearchInput";
import Grid from "@material-ui/core/Grid";
import FilledButton from "../atoms/FilledButton";
import ResultList from "../organisms/ResultList";
import NavTab from "../molecules/NavTab";
import Pagination from "../organisms/Pagination";

class ResultsPage extends Component {
	constructor() {
		super();

		// an example array of items to be paged
		var exampleItems = [...Array(150).keys()].map(i => ({
			id: i + 1,
			name: "Item " + (i + 1)
		}));

		this.state = {
			exampleItems: exampleItems,
			pageOfItems: []
		};

		// bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
		this.onChangePage = this.onChangePage.bind(this);
	}

	onChangePage(pageOfItems) {
		// update state with new page of items
		this.setState({ pageOfItems: pageOfItems });
	}

	render = () => {
		const { query, results, search, onChange } = this.props;
		return (
			<div>
				<Grid container justify="center">
					<BrowserTitle title={"Google IT"} />
				</Grid>
				<SearchInput value={query} onEnter={search} onChange={onChange} />
				<FilledButton onClick={search}>Buscar</FilledButton>

				<NavTab />
				<ResultList items={results} />
				<Pagination
					items={this.state.exampleItems}
					onChangePage={this.onChangePage}
				/>
			</div>
		);
	};
}

export default ResultsPage;
