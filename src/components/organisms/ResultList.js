import React, { Component } from "react";
import ResultItem from "../molecules/ResultItem";

class ResultList extends Component {
	listItemsResult(items, like) {
		return items.map((i, ind) => (
			<ResultItem
				key={ind}
				title={i.title}
				link={i.link}
				like={like}
				snippet={i.snippet}
				isLoggedIn={this.props.isLoggedIn}
			/>
		));
	}

	render = () => {
		const { items, like } = this.props;
		return <div>{this.listItemsResult(items, like)}</div>;
	};
}

export default ResultList;
