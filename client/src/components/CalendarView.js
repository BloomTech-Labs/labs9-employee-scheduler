import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'

// this component might feature a full monthly read only version of the calendar?
const Calendar = () => {
  return (
    <div>
      <LeftSideBar />
      <BreadCrumb location="Calendar" />
    </div>
  )
}

export default Calendar

Calendar.propTypes = {
  // add propstypes here
}
