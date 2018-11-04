import React, { Component } from "react";
import ResultItemImage from "../molecules/ResultItemImage"
import Grid from "@material-ui/core/Grid";

class ResultListImage extends Component {
    listItemsResult(items) {
        return items.map((i, ind) => (
            <Grid key={ind} item
            >
                <ResultItemImage
                    key={ind}
                    thumbnailLink={i.image.thumbnailLink}
                    title={i.title}
                    contextLink={i.image.contextLink}
                >
                </ResultItemImage>
            </Grid>
        ))
    }

    render = () => {
        const { items } = this.props;
        return (
            <Grid container spacing={8}>
                {this.listItemsResult(items)}
            </Grid>
        );
    };
}

export default (ResultListImage);

