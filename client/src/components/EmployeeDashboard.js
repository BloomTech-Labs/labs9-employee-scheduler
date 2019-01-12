import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import AssignedShifts from './EmpDashboardComp/AssignedShifts'
import TimeOffApproved from './EmpDashboardComp/TimeOffApproved'
import TimeOffRequest from './EmpDashboardComp/TimeOffRequest'
import styled from '@emotion/styled'
import system from '../design/theme'
import { fetchSingleEmployeeFromDB } from '../actions'
import { connect } from 'react-redux'

// This page will house all of the information that will be visible to the employees when they log in to the site

class EmployeeDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'Employee Dashboard'
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchSingleEmployeeFromDB(id)
  }

  // for when we adding loading state
  // componentDidUpdate(nextProps) {
  //   if (nextProps.employee.employee === null & this.props.employee.employee.loading) {
  //     this.props.history.push('/not-found')
  //   }
  // }

  render() {
    const { employee } = this.props.employee
    let assignedShift

    if (employee.shifts) {
      assignedShift = (
        <React.Fragment>
          {employee.shifts.map(item => {
            return (
              <div className="details" key={item.id}>
                <div>
                  <p>{item.day}</p>
                </div>
                <div>
                  <p>{item.time}</p>
                </div>
              </div>
            )
          })}
        </React.Fragment>
      )
    } else {
      assignedShift = 'loading'
    }

    return (
      <React.Fragment>
        <LeftSideBar />
        <BreadCrumb location={this.state.location} />
        <Container>
          <div className="employee-welcome">
            <h1>Welcome {employee.first_name}</h1>
          </div>
          <div className="wrapper">
            <div className="assigned-wrapper">
              <div className="title">
                <h5>Assigned Shifts</h5>
                {/* returns all assigned shift dates and times for the user */}
                {assignedShift}
              </div>
            </div>
            {/* <TimeOffApproved user={employee} /> */}
            <TimeOffRequest />
          </div>
        </Container>
      </React.Fragment>
    )
  }
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
    .assigned-wrapper {
      padding: ${system.spacing.bigPadding};
      box-shadow: ${system.shadows.otherLight};
      width: 100%;
      max-width: 253px;
      min-width: 253px;
      border-radius: ${system.borders.radius};
      .title {
        width: 100%;
        max-width: 200px;
        h5 {
          font-size: ${system.fontSizing.ml};
        }
        .details {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-between;
          margin: 33px auto;
          p {
            font-size: ${system.fontSizing.m};
          }
        }
      }
    }
  }
`
const mapStateToProps = state => {
  return {
    employee: state.employee
  }
}

export default connect(
  mapStateToProps,
  { fetchSingleEmployeeFromDB }
)(EmployeeDashboard)

EmployeeDashboard.propTypes = {
  // add propTypes here
}
