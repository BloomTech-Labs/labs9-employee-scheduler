import React, { Component } from 'react';
import propTypes from 'prop-types';

// this component should render the billing page for the app and use Stripe.
class Billing extends Component {
	render() {
		return (
			<div>
				<h1>Billing</h1>
			</div>
		);
	}
}

export default Billing;

Billing.propTypes = {
	// adding propTypes here
};
