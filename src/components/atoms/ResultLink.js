import React from "react";
import styled from "styled-components";

const Link = styled.a`
    color: green;
    font-size: small;
`;

const ResultLink = ({ link }) => {
	return (
        <Link href={link}>
			{link}
        </Link>
	);
};

export default ResultLink;

