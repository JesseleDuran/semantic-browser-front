import React, { Component } from "react";
import ResultItem from "../molecules/ResultItem"

class ResultList extends Component {
    listItemsResult(items) {

        return items.map((i, ind) => (
            <ResultItem
                key={ind}
                title={i.title}
                link={i.link}
                snippet={i.snippet}
                isLoggedIn={this.props.isLoggedIn}
            >
            </ResultItem>
        ))
    }

	render = () => {
        const { items } = this.props;
		return (
			<div>
                {this.listItemsResult(items)}
			</div>
		);
	};
}

export default (ResultList);
