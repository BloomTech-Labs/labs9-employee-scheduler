import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
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
      location: 'Employee Dashboard',
      errors: ''
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchSingleEmployeeFromDB(id)
  }

  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.error !== this.props.error) {
      this.setState({ error: this.props.error })
    }
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
            return (
              <div className="details" key={item.id}>
                <div className="date">
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
      assignedShift = <p>Loading...</p>
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
                  <p data-test-id="date">{item.date}</p>
                </div>
                <div className="reason">
                  <p data-test-id="reason">{item.reason}</p>
                </div>
              </div>
            )
          })}
        </React.Fragment>
      )
    } else {
      approvedTimeOff = <p>No Time off Approved yet</p>
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

            <div className="assigned-wrapper">
              <div className="title">
                <h5>Approved Time Off</h5>
                {approvedTimeOff}
              </div>
            </div>
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
      box-shadow: ${system.shadows.otherLight};
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
          justify-content: space-between;
          margin: 33px auto;
          .date {
            min-width: 128px;
          }
          .reason {
            width: 300px;
          }
          p {
            width: 100%;
            padding: 2.5px 7.5px;
            font-family: ${props =>
              props.main ? "'Lato', sans-serif" : 'inherit'};
            font-weight: ${props => (props.main ? 'bold' : null)};
            color: ${props =>
              props.main ? system.color.primary : system.color.captiontext};
            font-size: ${system.fontSizing.m};
            line-height: ${system.spacing.lineHeight};
          }
        }
      }
    }
  }
`
const mapStateToProps = state => {
  return {
    employee: state.employee,
    error: state.error
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
