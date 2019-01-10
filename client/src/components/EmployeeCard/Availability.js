import React, { Component } from 'react'
import propTypes from 'prop-types'

// this component should render the employee's weekly availability. It, in the future, will also have the ability to turn into a form to update such info.
class Availability extends Component {
  render() {
    return (
      <div>
        {/* display the employee's weekly availability (e.g. Mon, weds. 8am to 5pm)
         in the employees directory, the supervisor should be able to select days and use a timepicker to alter this. */}
      </div>
    )
  }
}

export default Availability

Availability.propTypes = {
  // adding propTypes here
}
