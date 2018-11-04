import React from "react";
import styled from "styled-components";

const Link = styled.a`
    color: green;
`;

const ResultLink = ({ link }) => {
	return (
        <Link href={link}>
			{link}
        </Link>
	);
};

export default ResultLink;

