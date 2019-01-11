import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'

// this component should render the billing page for the app and use Stripe.
class Billing extends Component {
  state = {
    location: 'Billing'
  }

  render() {
    return (
      <div>
        <LeftSideBar />
        <BreadCrumb location={this.state.location} />
      </div>
    )
  }
}

export default Billing

Billing.propTypes = {
  // adding propTypes here
}
