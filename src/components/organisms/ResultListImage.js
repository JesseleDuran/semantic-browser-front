import React, { Component } from "react";
import ResultItemImage from "../molecules/ResultItemImage";
import Grid from "@material-ui/core/Grid";

class ResultListImage extends Component {
	listItemsResult(items, like) {
		return items.map((i, ind) => {
			return (
				i.image && (
					<Grid key={ind} item>
						<ResultItemImage
							key={ind}
							thumbnailLink={i.image.thumbnailLink}
							title={i.title}
							like={like}
							contextLink={i.image.contextLink}
							isLoggedIn={this.props.isLoggedIn}
						/>
					</Grid>
				)
			);
		});
	}

	render = () => {
		const { items, like } = this.props;
		return (
			<Grid container spacing={8}>
				{this.listItemsResult(items, like)}
			</Grid>
		);
	};
}

export default ResultListImage;
