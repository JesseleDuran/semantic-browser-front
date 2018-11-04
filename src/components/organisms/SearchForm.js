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
		const { onChange, search } = this.props;
		return (
			<div>
				<Grid container justify="center">
					<BlueLetter size="7vw">{"G"}</BlueLetter>
					<RedLetter size="7vw">{"o"}</RedLetter>
					<YellowLetter size="7vw">{"o"}</YellowLetter>
					<BlueLetter size="7vw">{"g"}</BlueLetter>
					<GreenLetter size="7vw">{"l"}</GreenLetter>
					<RedLetter size="7vw">{"e"}</RedLetter>
					<YellowLetter size="7vw">{" I"}</YellowLetter>
					<BlueLetter size="7vw">{"T"}</BlueLetter>
				</Grid>
				<SearchInput onChange={onChange} onEnter={search} />
				<Button variant="outlined" onClick={search}>
					Buscar con Google
				</Button>
				<Button variant="outlined" onClick={search}>
					Me siento con suerte
				</Button>
			</div>
		);
	};
}

export default SearchForm;
