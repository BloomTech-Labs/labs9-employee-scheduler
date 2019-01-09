import React from 'react';
import LinkItem from './common';

// this breadcrumb will be placed at the top should show the following links
// Home component --> Sign Up || Sign In (if not logged in) --> Log Out (if logged)

const BreadCrumb = (props) => {
	return (
		<nav>
			<LinkItem to="/">Home</LinkItem>
		</nav>
	);
};

export default BreadCrumb;
