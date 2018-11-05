import React, { Component } from "react";
import ResultItemImage from "../molecules/ResultItemImage";
import Grid from "@material-ui/core/Grid";

class ResultListImage extends Component {
	listItemsResult(items, like, unlike) {
		return items.map((i, ind) => {
			return (
				i.image && (
					<Grid key={ind} item>
						<ResultItemImage
							id={i.id}
							isFav={i.isFav}
							key={ind}
							thumbnailLink={i.image.thumbnailLink}
							title={i.title}
							like={like}
							unlike={unlike}
							contextLink={i.image.contextLink}
							isLoggedIn={this.props.isLoggedIn}
						/>
					</Grid>
				)
			);
		});
	}

	render = () => {
		const { items, like, unlike } = this.props;
		return (
			<Grid container spacing={8}>
				{this.listItemsResult(items, like, unlike)}
			</Grid>
		);
	};
}

export default ResultListImage;
