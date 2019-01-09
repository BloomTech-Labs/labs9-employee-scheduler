import React, { Component } from 'react';
import propTypes from 'prop-types';

// this will be used with react router to serve as private routes that only allow authenticated users
class PrivateRoute extends Component {
	render() {
		return <div />;
	}
}

export default PrivateRoute;

PrivateRoute.propTypes = {
	// add propTypes here
};
