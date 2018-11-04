import React from "react";
import styled from "styled-components";
import { DotLoader } from "react-spinners";
import Grid from "@material-ui/core/Grid";

const Container = styled.div`
	position: fixed;
	padding-left: 50%;
	padding-top: 15%;
	z-index: 2;
	width: 100%;
	height: 100%;
	background: #fafafac7;
`;

const PageLoader = ({ active }) => {
	return active ? (
		<Container>
			<Grid container>
				<Grid item xs={12}>
					<DotLoader color={"#16B497"} loading={true} size={180} />
				</Grid>
			</Grid>
		</Container>
	) : null;
};

export default PageLoader;
