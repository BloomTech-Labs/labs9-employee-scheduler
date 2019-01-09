import React from 'react';
import LinkItem from './common/LinkItem';
import styled from '@emotion/styled';
import system from '../design/theme';

// this breadcrumb will be placed at the top should show the following links
// Home component --> Sign Up || Sign In (if not logged in) --> Log Out (if logged)

const BreadCrumb = (props) => {
	// initialize content for condition
	let breadContent;
	// ask the recieving component what location will be
	if (props.location !== 'Home') {
		breadContent = (
			<Container>
				<LinkItem to="/">Home</LinkItem>
			</Container>
		);
	}
	if (props.location === 'Home') {
		breadContent = (
			<Container className="breadcrumbs" right>
				<LinkItem to="/signup">Sign Up</LinkItem>
				<LinkItem to="/signup">Sign In</LinkItem>
			</Container>
		);
	}

	return breadContent;
};

export default BreadCrumb;

// basic styling to match design file
const Container = styled('nav')`
background-color: ${system.color.neutral};
display: flex;
flex-direction: row;
justify-content: ${(props) => (props.right ? 'flex-end' : 'flex-start')};
padding: ${system.spacing.bigPadding};
	width: 100%;
	height: 80px;
	a {
		margin-right: 15px;
		font-size: ${system.fontSizing.m};
		text-decoration: none;
	}
`;
