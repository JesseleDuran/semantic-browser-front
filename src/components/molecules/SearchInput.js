import React from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "../atoms/TextInput";

const SearchInput = ({ onChange, onEnter, disabled = false, value }) => {
	return (
		<Grid container justify="center">
			<TextInput
				value={value}
				onChange={evt => onChange(evt.target.value)}
				onKeyPress={e => {
					if (onEnter && e.key === "Enter") onEnter();
				}}
				disabled={disabled}
			/>
		</Grid>
	);
};

export default SearchInput;
