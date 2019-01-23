import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import moment from 'moment'
// import TimeOffApproved from './EmpDashboardComp/TimeOffApproved'
import TimeOffRequest from './EmpDashboardComp/TimeOffRequest'
import styled from '@emotion/styled'
import system from '../design/theme'
import { fetchSingleEmployeeFromDB } from '../actions/employeesActions'

import { connect } from 'react-redux'

// This page will house all of the information that will be visible to the employees when they log in to the site

class EmployeeDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: ''
    }
  }

  componentDidMount() {
    const { id } = this.props.auth
    this.props.fetchSingleEmployeeFromDB(id)
  }

  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.error !== this.props.error) {
      this.setState({ error: this.props.error })
    }

    if (prevProps.auth.id !== this.props.auth.id) {
      this.props.fetchSingleEmployeeFromDB(this.props.auth.id)
    }
  }

  // for when we adding loading state to redux
  // componentDidUpdate(nextProps) {
  //   if (nextProps.employee.employee === null & this.props.employee.employee.loading) {
  //     this.props.history.push('/not-found')
  //   }
  // }

  render() {
    console.log(this.props.employee.employee)
    const { employee } = this.props.employee
    let assignedShift
    let approvedTimeOff

    if (employee.shifts) {
      assignedShift = (
        <React.Fragment>
          {employee.shifts.map(item => {
            return (
              <div className="details" key={item.id}>
                <div className="date">
                  <p>
                    {moment(item.start).format('MMM Do, h:mma')} to{' '}
                    {moment(item.end).format('h:mma')}
                  </p>
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

    if (employee.time_off) {
      approvedTimeOff = (
        <React.Fragment>
          {employee.time_off.map(item => {
            return (
              <div className="details" key={item.id}>
                <div className="date">
                  <p data-testid="date">{item.date}</p>
                </div>
                <div className="reason">
                  <p data-testid="reason">{item.reason}</p>
                  {/* needs logic added to the button to remove the request */}
                  <button>Remove</button>
                </div>
              </div>
            )
          })}
        </React.Fragment>
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
            <div className="assigned-wrapper">
              <div className="title">
                <h5>Assigned Shifts</h5>
                {/* returns all assigned shift dates and times for the user */}
                {assignedShift}
              </div>
            </div>

            <div className="assigned-wrapper">
              <div className="title">
                <h5>Approved Time Off</h5>
                {approvedTimeOff}
              </div>
            </div>
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
    auth: state.auth.user
  }
}

export default connect(
  mapStateToProps,
  { fetchSingleEmployeeFromDB }
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
      background: ${system.color.white};
      padding: ${system.spacing.standardPadding};
      margin: ${system.spacing.bigPadding};
      border-radius: ${system.borders.bigRadius};
      width: 300px;
      box-shadow: ${system.shadows.other};
      text-align: center;
      .title {
        width: 100%;
        max-width: 268px;
        h5 {
          font-size: ${system.fontSizing.ml};
        }
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
    }
  }
`
