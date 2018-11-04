import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ResultTitle from "../atoms/ResultTitle"
import ResultLink from "../atoms/ResultLink"
import ResultSnippet from "../atoms/ResultSnippet"

class ResultItem extends Component {

	render = () => {
        const { title, link, snippet, isFav } = this.props;
		return (
			<Grid container alignItems="center">
				<ResultTitle>{title}</ResultTitle>
                <ResultLink link={link}></ResultLink>
                <ResultSnippet>{snippet}</ResultSnippet>
			</Grid>
		);
	};
}

export default ResultItem;
