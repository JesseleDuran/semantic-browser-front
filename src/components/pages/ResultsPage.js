import React, { Component } from "react";
import SearchForm from "../organisms/SearchForm";
import Grid from "@material-ui/core/Grid";
import PrincipalAppBar from "../molecules/PrincipalAppBar";
import ResultList from "../organisms/ResultList";
import ResultListImage from "../organisms/ResultListImage";
import NavTab from "../molecules/NavTab";
import Pagination from "../organisms/Pagination";
import SearchFormResults from "../organisms/SearchFormResults";
import ViewPager from "../molecules/ViewPager";

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

		this.onChangePage = this.onChangePage.bind(this);
	}

	onChangePage(pageOfItems) {
		this.setState({ pageOfItems: pageOfItems });
	}

	render = () => {
		const {
			query,
			results,
			search,
			onChange,
			tab,
			onTabChange,
			isLoggedIn,
			like,
			unlike
		} = this.props;
		console.log(results);
		return (
			<div>
				<PrincipalAppBar />,
				<SearchFormResults onChange={onChange} search={search} value={query} />
				<NavTab value={tab} onChange={onTabChange} />
				<ViewPager page={tab}>
					{results && (
						<ResultList
							items={results.items}
							isLoggedIn={isLoggedIn}
							like={like}
							unlike={unlike}
						/>
					)}
					{results && (
						<ResultListImage
							items={results.items}
							isLoggedIn={isLoggedIn}
							like={like}
							unlike={unlike}
						/>
					)}
				</ViewPager>
				<Pagination
					items={this.state.exampleItems}
					onChangePage={this.onChangePage}
				/>
			</div>
		);
	};
}

export default ResultsPage;
