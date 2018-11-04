import React from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "../atoms/TextInput"

const SearchInput = ({ onChange, disabled = false }) => {
	return (
		<Grid container justify="center">
			<TextInput
			/>
		</Grid>
	);
};

export default SearchInput;
