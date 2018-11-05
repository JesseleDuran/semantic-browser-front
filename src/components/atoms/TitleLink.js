import styled from "styled-components";
import React from "react";

const Link = styled.a`
    color: #1a0dab;
    font-size: medium;
`;

const TitleLink = ({ link, title }) => {
	return (
        <Link href={link}>
			{title}
        </Link>
	);
};

export default TitleLink;