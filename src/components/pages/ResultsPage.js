import React, { Component } from "react";
import SearchForm from "../organisms/SearchForm";
import Grid from "@material-ui/core/Grid";
import PrincipalAppBar from "../molecules/PrincipalAppBar";
import ResultList from "../organisms/ResultList";
import ResultListImage from "../organisms/ResultListImage";
import NavTab from "../molecules/NavTab";
import { Pagination } from "react-materialize";
import SearchFormResults from "../organisms/SearchFormResults";
import ViewPager from "../molecules/ViewPager";

class ResultsPage extends Component {
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
			onChangePage,
			page,
			unlike
		} = this.props;
		console.log(results);
		return (
			<div>
				<PrincipalAppBar isLoggedIn={isLoggedIn} />,
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
				<Grid container justify="center">
					{results && (
						<Pagination
							items={results.queries.request[0].totalResults / 10}
							activePage={page}
							onSelect={onChangePage}
							maxButtons={8}
						/>
					)}
				</Grid>
			</div>
		);
	};
}

export default ResultsPage;
