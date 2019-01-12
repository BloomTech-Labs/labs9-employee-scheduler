import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import AssignedShifts from './EmpDashboardComp/AssignedShifts'
import TimeOffApproved from './EmpDashboardComp/TimeOffApproved'
import TimeOffRequest from './EmpDashboardComp/TimeOffRequest'
import styled from '@emotion/styled'
import system from '../design/theme'

// This page will house all of the information that will be visible to the employees when they log in to the site

//
class EmployeeDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'Employee Dashboard',
      user: [
        {
          id: 1,
          firstname: 'Ariel',
          lastname: 'Smith',
          assignedShift: [
            {
              id: 1,
              date: 'July 18',
              times: '10am-2pm'
            },
            {
              id: 2,
              date: 'July 20',
              times: '10am-2pm'
            },
            {
              id: 3,
              date: 'July 21',
              times: '10am-2pm'
            }
          ],
          timeOffApproved: [
            {
              id: 1,
              date: 'July 24th'
            },
            {
              id: 2,
              date: 'July 27th'
            }
          ],
          timeOffRequest: [
            {
              id: 1,
              data: 'July 25th',
              reason: 'Sick day'
            },
            {
              id: 2,
              data: 'July 25th',
              reason: 'Sick day'
            }
          ]
        }
      ]
    }
  }
  render() {
    return (
      <React.Fragment>
        <LeftSideBar />
        <BreadCrumb location={this.state.location} />
        <Container>
          <div className="employee-welcome">
            <h1>Welcome {this.state.user[0].firstname}</h1>
          </div>
          <div className="wrapper">
            <AssignedShifts user={this.state.user} />
            <TimeOffApproved user={this.state.user} />
            <TimeOffRequest />
          </div>
        </Container>
      </React.Fragment>
    )
  }
}

export default EmployeeDashboard

EmployeeDashboard.propTypes = {
  // add propTypes here
}

const Container = styled('div')`
  width: 100%;
  padding: ${system.spacing.container};
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  .employee-welcome {
    font-size: ${system.fontSizing.l};
    margin: 15px 0 58px 0;
  }
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }
`
