import React, { Component } from 'react'
import propTypes from 'prop-types'
import Scheduler from './Scheduler'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import OuterContainer from './common/OuterContainer'

// this component will house all of the main features for the create schedule page.
const CreateSchedule = () => {
  return (
    <OuterContainer>
      <LeftSideBar />
      <BreadCrumb location="Schedule" />
      {/* DO NOT REMOVE THE LEFTSIDEBAR AND BREADCRUMB COMPONENTS - THEY NEED TO BE HERE */}
      <Scheduler />
    </OuterContainer>
  )
}

export default CreateSchedule

CreateSchedule.propTypes = {
  // add propTypes here
}
