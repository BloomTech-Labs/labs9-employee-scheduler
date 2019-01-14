import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import Scheduler from './Scheduler'

// this component will house all of the main features for the create schedule page.
class CreateSchedule extends Component {
  state = {
    location: 'Schedule'
  }
  render() {
    return (
      <div>
        <LeftSideBar />
        <BreadCrumb location={this.state.location} />
        <Scheduler />
      </div>
    )
  }
}

export default CreateSchedule

CreateSchedule.propTypes = {
  // add propTypes here
}
