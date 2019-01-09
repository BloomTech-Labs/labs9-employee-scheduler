import React, { Component } from 'react';
import propTypes from 'prop-types';
// This will have admin information on employees (name, email, phone number, availability ext), managers will be able to add new employees through here.
class Employees extends Component {
	render() {
		return (
			<div>
				<h1>Employees</h1>
			</div>
		);
	}
}

export default Employees;

Employees.propTypes = {
	// add propTypes here
};
