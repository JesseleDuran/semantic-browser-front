import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TitleLink from "../atoms/TitleLink"
import ResultLink from "../atoms/ResultLink"
import ResultSnippet from "../atoms/ResultSnippet"
import Favorite from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'

class ResultItem extends Component {

	render = () => {
        const { title, link, snippet, isFav } = this.props;
		return (
			<Grid container
				direction="column"
				justify="flex-start"
				alignItems="flex-start"
			>
				<div><TitleLink link={link} title={title}></TitleLink>
					<IconButton color="inherit">
						<Favorite color="disabled" />
					</IconButton>
				</div>
                <ResultLink link={link}></ResultLink>
                <ResultSnippet>{snippet}</ResultSnippet>
			</Grid>
		);
	};
}

export default ResultItem;
