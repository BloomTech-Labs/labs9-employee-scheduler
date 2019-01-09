import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'

// this component will house all of the main features for the create schedule page.
class CreateSchedule extends Component {
  render() {
    return (
      <div>
        <BreadCrumb />
        <h1>Create Schedule</h1>
      </div>
    )
  }
}

export default CreateSchedule

CreateSchedule.propTypes = {
  // add propTypes here
}
