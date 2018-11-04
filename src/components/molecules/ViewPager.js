import React from "react";

const ViewPager = ({ page, children }) => {
	return children[page];
};

export default ViewPager;
