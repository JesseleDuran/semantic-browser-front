import React, { Component } from "react";
import SearchInput from "../molecules/SearchInput";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import BlueLetter from "../atoms/BlueLetter";
import RedLetter from "../atoms/RedLetter";
import YellowLetter from "../atoms/YellowLetter";
import GreenLetter from "../atoms/GreenLetter";

const styles = theme => ({
	base: {
		width: "70%",
		paddingLeft: "15px"
	},
	firstLetter: {
		paddingLeft: "15px"
	}
});

class SearchFormResults extends Component {
	render = () => {
		const { onChange, search, classes, value } = this.props;
		return (
			<div>
				<Grid
					container
					direction="row"
					justify="flex-start"
					alignItems="center"
				>
					<BlueLetter className={classes.firstLetter} size={"2vw"}>
						{"G"}
					</BlueLetter>
					<RedLetter size={"2vw"}>{"o"}</RedLetter>
					<YellowLetter size={"2vw"}>{"o"}</YellowLetter>
					<BlueLetter size={"2vw"}>{"g"}</BlueLetter>
					<GreenLetter size={"2vw"}>{"l"}</GreenLetter>
					<RedLetter size={"2vw"}>{"e"}</RedLetter>
					<YellowLetter size={"2vw"}>{" I"}</YellowLetter>
					<BlueLetter size={"2vw"}>{"T"}</BlueLetter>
					<Grid item className={classes.base}>
						<SearchInput
							justify="flex-start"
							onChange={onChange}
							onEnter={(value.length >= 1) ? search : null}
							value={value}
						/>
					</Grid>
				</Grid>
			</div>
		);
	};
}
export default withRouter(withStyles(styles)(SearchFormResults));
