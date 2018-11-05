import React, { Component } from "react";
import SearchInput from "../molecules/SearchInput";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BlueLetter from "../atoms/BlueLetter";
import RedLetter from "../atoms/RedLetter";
import YellowLetter from "../atoms/YellowLetter";
import GreenLetter from "../atoms/GreenLetter";

class SearchForm extends Component {
	render = () => {
		const { onChange, search, onLucky, query } = this.props;
		console.log(query)
		return (
			<div>
				<Grid container justify="center">
					<BlueLetter size={"6vw"}>{"G"}</BlueLetter>
					<RedLetter size={"6vw"}>{"o"}</RedLetter>
					<YellowLetter size={"6vw"}>{"o"}</YellowLetter>
					<BlueLetter size={"6vw"}>{"g"}</BlueLetter>
					<GreenLetter size={"6vw"}>{"l"}</GreenLetter>
					<RedLetter size={"6vw"}>{"e"}</RedLetter>
					<YellowLetter size={"6vw"}>{" I"}</YellowLetter>
					<BlueLetter size={"6vw"}>{"T"}</BlueLetter>
					<SearchInput justify="center" onChange={onChange} onEnter={(query.length >= 1) ? search : null} />
					<Button variant="outlined" onClick={search} disabled={query.length < 1}>
						Buscar con Google
					</Button>
					<Button variant="outlined" onClick={onLucky} disabled={query.length < 1}>
						Me siento con suerte
					</Button>
				</Grid>
			</div>
		);
	};
}

export default SearchForm;
