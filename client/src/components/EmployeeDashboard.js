import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
// This page will house all of the information that will be visible to the employees when they log in to the site

//
class EmployeeDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        firstname: 'Ariel',
        lastname: 'Smith',
        assignedShift: [
          {
            date: 'July 18',
            times: '10am-2pm'
          },
          {
            date: 'July 20',
            times: '10am-2pm'
          },
          {
            date: 'July 21',
            times: '10am-2pm'
          }
        ],
        timeOfApproved: {
          date: 'July 24th'
        },
        timeOfRequest: {
          data: 'July 25th',
          reason: 'Sick day'
        }
      }
    }
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

export default EmployeeDashboard

EmployeeDashboard.propTypes = {
  // add propTypes here
}
