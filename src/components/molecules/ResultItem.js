import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TitleLink from "../atoms/TitleLink";
import ResultLink from "../atoms/ResultLink";
import ResultSnippet from "../atoms/ResultSnippet";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

class ResultItem extends Component {
	render = () => {
		const {
			title,
			link,
			id,
			snippet,
			isFav,
			isLoggedIn,
			like,
			unlike
		} = this.props;
		return (
			<Grid
				container
				direction="column"
				justify="flex-start"
				alignItems="flex-start"
			>
				<div>
					<TitleLink link={link} title={title} />
					{isLoggedIn ? (
						<IconButton
							color="inherit"
							onClick={() => (isFav ? unlike(id) : like(link))}
						>
							<Favorite color={isFav ? "action" : "disabled"} />
						</IconButton>
					) : null}
				</div>
				<ResultLink link={link} />
				<ResultSnippet>{snippet}</ResultSnippet>
			</Grid>
		);
	};
}

export default ResultItem;
