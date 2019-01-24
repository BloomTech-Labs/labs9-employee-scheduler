import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
// import TimeOffApproved from './EmpDashboardComp/TimeOffApproved'
import TimeOffRequest from './EmpDashboardComp/TimeOffRequest'
import styled from '@emotion/styled'
import system from '../design/theme'
import AssignedShifts from './EmpDashboardComp/AssignedShifts'
import {
  fetchSingleEmployeeFromDB,
  deleteTimeOffRequest
} from '../actions/employeesActions'
import { connect } from 'react-redux'
import TimeOffApproved from './EmpDashboardComp/TimeOffApproved'

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
      this.setState({ error: this.props.error })
    }

    if (prevProps.auth.user.id !== this.props.auth.user.id) {
      this.props.fetchSingleEmployeeFromDB(this.props.auth.id, this.props.token)
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

    if (Object.keys(employee).length === 0) {
      assignedShift = <p>{this.state.error}</p>
      approvedTimeOff = <p>{this.state.error}</p>
    }

    if (employee.time_off > 0) {
      approvedTimeOff = (
        <>
          {employee.time_off.map(item => (
            <TimeOffApproved {...item} />
          ))}
        </>
      )
    } else {
      approvedTimeOff = (
        <Message>
          <p>No Request Status to display</p>
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

const Message = styled('div')`
  margin-top: 30px;
  font-size: ${system.fontSizing.sm};
`

const Container = styled('div')`
  width: 100%;
  padding: ${system.spacing.container};
  display: flex;
  flex-direction: column;
  justify-content: center;
  h6 {
    font-size: ${system.fontSizing.m};
    margin: 10px 0;
  }
  .employee-welcome {
    font-size: ${system.fontSizing.l};
    margin: 15px 0 58px 0;
  }
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    .title {
      width: 100%;
      min-width: 268px;
      max-width: 500px;
      h5 {
        font-size: ${system.fontSizing.ml};
      }
    }
  }
`
const AssignedWrapper = styled('div')`
  background: ${system.color.white};
  padding: ${system.spacing.standardPadding};
  margin: ${system.spacing.bigPadding};
  border-radius: ${system.borders.bigRadius};
  width: 300px;
  box-shadow: ${system.shadows.other};
  text-align: center;
  .details {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin: 33px auto;
    .date {
      min-width: 128px;
    }
    .reason {
      width: 300px;
    }
    p {
      text-align: center;
      width: 100%;
      padding: 2.5px 7.5px;
      font-family: ${props => (props.main ? "'Lato', sans-serif" : 'inherit')};
      font-weight: ${props => (props.main ? 'bold' : null)};
      color: ${props =>
        props.main ? system.color.primary : system.color.captiontext};
      font-size: ${system.fontSizing.sm};
      line-height: ${system.spacing.lineHeight};
    }
  }
`

const TofWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  background: ${system.color.white};
  padding: ${system.spacing.standardPadding};
  margin: ${system.spacing.bigPadding};
  border-radius: ${system.borders.bigRadius};
  width: 500px;
  box-shadow: ${system.shadows.other};
  text-align: center;

  .details {
    display: flex;
    flex-direction: row;
    margin: 33px auto;

    .box {
      display: flex;
      flex-direction: row;
      width: 90%;
      .date {
        min-width: 128px;
      }
      .reason {
        width: 300px;
      }

      p {
        text-align: center;
        width: 100%;
        padding: 2.5px 7.5px;
        font-family: ${props =>
          props.main ? "'Lato', sans-serif" : 'inherit'};
        font-weight: ${props => (props.main ? 'bold' : null)};
        color: ${props =>
          props.main ? system.color.primary : system.color.captiontext};
        font-size: ${system.fontSizing.sm};
        line-height: ${system.spacing.lineHeight};
      }
    }
  }
`
