import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
// import TimeOffApproved from './EmpDashboardComp/TimeOffApproved'
import TimeOffRequest from './EmpDashboardComp/TimeOffRequest'
import AssignedShifts from './EmpDashboardComp/AssignedShifts'
import {
  fetchSingleEmployeeFromDB,
  deleteTimeOffRequest
} from '../actions/employeesActions'
import { connect } from 'react-redux'
import TimeOffApproved from './EmpDashboardComp/TimeOffApproved'
import {
  Message,
  Container,
  AssignedWrapper,
  TofWrapper
} from './EmpDashboardComp/styles'

// This page will house all of the information that will be visible to the employees when they log in to the site

class EmployeeDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: ''
    }
  }

  componentDidMount() {
    const { id } = this.props.auth.user
    this.props.fetchSingleEmployeeFromDB(id, this.props.auth.token)
  }

  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.error !== this.props.error) {
      return this.setState({ error: this.props.error })
    }

    if (prevProps.auth.user.id !== this.props.auth.user.id) {
      return this.props.fetchSingleEmployeeFromDB(
        this.props.auth.id,
        this.props.token
      )
    }
  }

  deleteExpiredRequest = id => {
    const { token } = this.props.auth
    this.props.deleteTimeOffRequest(id, token)
  }

  // for when we adding loading state to redux
  // componentDidUpdate(nextProps) {
  //   if (nextProps.employee.employee === null & this.props.employee.employee.loading) {
  //     this.props.history.push('/not-found')
  //   }
  // }

  render() {
    const { employee } = this.props.employee
    let assignedShift
    let approvedTimeOff
    if (employee.shifts) {
      assignedShift = (
        <React.Fragment>
          {employee.shifts.map(item => {
            return <AssignedShifts key={item.id} {...item} />
          })}
        </React.Fragment>
      )
    } else {
      assignedShift = (
        <Message>
          <p>You haven't been Assigned yet</p>
        </Message>
      )
    }

    if (!employee.time_off) {
      approvedTimeOff = <p>No Request Status to display</p>
    } else {
      approvedTimeOff = (
        <Message>
          <>
            {employee.time_off.map(item => (
              <TimeOffApproved {...item} />
            ))}
          </>
        </Message>
      )
    }

    return (
      <React.Fragment>
        <LeftSideBar />
        <BreadCrumb location="Employee Dashboard" />
        <Container>
          <div className="employee-welcome">
            <h1>Welcome {this.props.auth.first_name}</h1>
          </div>
          <div className="wrapper">
            <AssignedWrapper>
              <div className="title">
                <h5>Assigned Shifts</h5>
                {/* returns all assigned shift dates and times for the user */}
                {assignedShift}
              </div>
            </AssignedWrapper>
            <TofWrapper className="tof-wrapper">
              <div className="title">
                <h5>Approved Time Off</h5>
                {approvedTimeOff}
              </div>
            </TofWrapper>
            <div className="title">
              <TimeOffRequest />
            </div>
          </div>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    employee: state.employee,
    error: state.error,
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { fetchSingleEmployeeFromDB, deleteTimeOffRequest }
)(EmployeeDashboard)

EmployeeDashboard.propTypes = {
  employee: propTypes.object,
  fetchSingleEmployeeFromDB: propTypes.func.isRequired,
  error: propTypes.string
}
