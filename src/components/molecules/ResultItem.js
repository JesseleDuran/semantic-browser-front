import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TitleLink from "../atoms/TitleLink"
import ResultLink from "../atoms/ResultLink"
import ResultSnippet from "../atoms/ResultSnippet"

class ResultItem extends Component {

	render = () => {
        const { title, link, snippet, isFav } = this.props;
		return (
			<Grid container
				direction="column"
				justify="flex-start"
				alignItems="flex-start"
			>
				<TitleLink link={link} title={title}></TitleLink>
                <ResultLink link={link}></ResultLink>
                <ResultSnippet>{snippet}</ResultSnippet>
			</Grid>
		);
	};
}

export default ResultItem;
