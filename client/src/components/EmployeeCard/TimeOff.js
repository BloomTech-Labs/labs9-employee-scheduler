import React, { Component } from 'react'
import propTypes from 'prop-types'

// this component should render the employee's PTO. It will also display pending PTO so managers can approve or reject.
class Billing extends Component {
  render() {
    return (
      <div>
        <h1>Billing</h1>
      </div>
    )
  }
}

export default Billing

Billing.propTypes = {
  // adding propTypes here
}
