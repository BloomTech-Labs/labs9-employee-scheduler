import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// this breadcrumb will be placed at the top should show the following links
// Home component --> Sign Up || Sign In (if not logged in) --> Log Out (if logged)

const BreadCrumb = (props) => {
	return (
		<nav>
			<Link>{props.link}</Link>
		</nav>
	);
};

export default BreadCrumb;
