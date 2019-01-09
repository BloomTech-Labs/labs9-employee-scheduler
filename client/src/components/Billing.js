import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'

// this component should render the billing page for the app and use Stripe.
class Billing extends Component {
  render() {
    return (
      <div>
        <BreadCrumb />
        <h1>Billing</h1>
      </div>
    )
  }
}

export default Billing

Billing.propTypes = {
  // adding propTypes here
}
