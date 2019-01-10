import React, { Component } from 'react'
import propTypes from 'prop-types'

// this component should render the employee's PTO. It will also display pending PTO so managers can approve or reject.
class TimeOff extends Component {
  render() {
    return (
      <div>
        {/* Employee's Time Off */}
        {/* When this component is being rendered on the calendar page employee sidebar, it should show approved PTO
        When it's on the employees directory page, it should show pending PTO */}
      </div>
    )
  }
}

export default TimeOff

TimeOff.propTypes = {
  // adding propTypes here
}
