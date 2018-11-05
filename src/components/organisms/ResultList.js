import React, { Component } from "react";
import ResultItem from "../molecules/ResultItem";

class ResultList extends Component {
	listItemsResult(items, like, unlike) {
		return items.map((i, ind) => (
			<ResultItem
				id={i.id}
				key={ind}
				title={i.title}
				link={i.link}
				isFav={i.isFav}
				like={like}
				unlike={unlike}
				snippet={i.snippet}
				isLoggedIn={this.props.isLoggedIn}
			/>
		));
	}

	render = () => {
		const { items, like, unlike } = this.props;
		return <div>{this.listItemsResult(items, like, unlike)}</div>;
	};
}

export default ResultList;
