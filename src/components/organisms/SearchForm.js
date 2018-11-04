import React, { Component } from "react";
import BrowserTitle from "../atoms/BrowserTitle";
import SearchInput from "../molecules/SearchInput";
import Grid from "@material-ui/core/Grid";
import FilledButton from "../atoms/FilledButton";
import Button from "@material-ui/core/Button";

class SearchForm extends Component {
	render = () => {
		const { onChange, search } = this.props;
		return (
			<div>
				<Grid container justify="center">
					<BrowserTitle title={"Google IT"} />
				</Grid>
				<SearchInput onChange={onChange} onEnter={search} />
				<Button variant="outlined" onClick={search}>
					Buscar con Google
				</Button>
			</div>
		);
	};
}

export default SearchForm;
