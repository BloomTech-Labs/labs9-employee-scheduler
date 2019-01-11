import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
// This page will house all of the information that will be visible to the employees when they log in to the site
class EmployeeDashboard extends Component {
  render() {
    return (
      <div>
        <LeftSideBar />
        <BreadCrumb location={this.state.location} />
      </div>
    )
  }
}

export default EmployeeDashboard

EmployeeDashboard.propTypes = {
  // add propTypes here
}
