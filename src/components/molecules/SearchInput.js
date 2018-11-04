import React from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "../atoms/TextInput";

const SearchInput = ({ onChange, onEnter, disabled = false, value, justify }) => {
	return (
		<Grid container justify={justify}>
			<TextInput
				autoFocus
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
