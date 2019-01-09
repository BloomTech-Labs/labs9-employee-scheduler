import React, { Component } from 'react';
import propTypes from 'prop-types';

// this is the main landing page, it will house the payment options and main site branding styles. The nav here will display as Sign Up || Sign In.
// if a user is logged in already, it will display the Schedule now button and the navbar will change to logout.
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<h1>Home Page</h1>
			</div>
		);
	}
}

export default Home;

Home.propTypes = {
	// add propTypes here
};
