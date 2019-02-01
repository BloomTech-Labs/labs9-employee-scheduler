import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import TimeOffApproved from './EmployeeDashboard/TimeOffApproved'
import TimeOffRequest from './EmployeeDashboard/TimeOffRequest'
import AssignedShifts from './EmployeeDashboard/AssignedShifts'
import {
  fetchSingleEmployeeFromDB,
  deleteTimeOffRequest
} from '../actions/employeesActions'
import { connect } from 'react-redux'
import { Message, Container, Card } from './EmployeeDashboard/styles'
import OuterContainer from './common/OuterContainer'
import Availability from './EmployeeDashboard/Availability'
import DropCal from './Scheduler/DropCal'
import { getHoursOfOperationRange } from '../utils'
import DashCal from './EmployeeDashboard/DashCal'

// This page will house all of the information that will be visible to the employees when they log in to the site

class EmployeeDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: '',
      view: 'week',
      date: new Date()
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
  }

  deleteExpiredRequest = (torId, token) => {
    const r = window.confirm(
      `This will rescind your PTO request. Are you sure you want to do that?`
    )
    if (r) {
      this.props.deleteTimeOffRequest(torId, token)
    }
  }

  // for when we adding loading state to redux
  // componentDidUpdate(nextProps) {
  //   if (nextProps.employee.employee === null & this.props.employee.employee.loading) {
  //     this.props.history.push('/not-found')
  //   }
  // }

  render() {
    // const { employee, hours } = this.props.employee
    const { employees, hours, employee } = this.props
    const { view, date } = this.state
    const names = []

    const events = employees.reduce((acc, employee) => {
      return [
        ...acc,
        ...employee.events.map(event => {
          return {
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
            title: `${employee.first_name} ${employee.last_name}`
          }
        })
      ]
    }, [])
    let hourRange = getHoursOfOperationRange(hours)

    return (
      <OuterContainer>
        <LeftSideBar />
        <BreadCrumb location="Employee Dashboard" />

        <Container>
          <div className="employee-welcome">
            <h1>
              Hi there, {this.props.auth.user.first_name}. Hope you're having a
              lovely day!
            </h1>
          </div>
          <div>
            {/* <DropCal
              popover
              events={events}
              eventPropGetter={event => ({
                className: event.title.split(' ')[0]
              })}
              names={names}
              updateDragState={this.updateDragState}
              // onEventDrop={this.moveEvent}
              // onEventResize={this.resizeEvent}
              // onSelectSlot={this.createEvent}
              // onSelectEvent={this.deleteEvent}
              min={hourRange.min}
              max={hourRange.max}
              view={view}
              date={date}
              slotPropGetter={this.validateDrop}
            /> */}
            <DashCal
              popover
              events={events}
              eventPropGetter={event => ({
                className: event.title.split(' ')[0]
              })}
              names={names}
              updateDragState={this.updateDragState}
              // onEventDrop={this.moveEvent}
              // onEventResize={this.resizeEvent}
              // onSelectSlot={this.createEvent}
              // onSelectEvent={this.deleteEvent}
              min={hourRange.min}
              max={hourRange.max}
              view={view}
              date={date}
              slotPropGetter={this.validateDrop}
            />
          </div>

          <div className="wrapper">
            <Card>
              <div className="title">
                <h5>Your Upcoming Shifts</h5>
              </div>
              {/* returns all assigned shift dates and times for the user */}
              {employee && employee.shifts ? (
                <>
                  {employee.shifts.map(item => {
                    return <AssignedShifts key={item.id} {...item} />
                  })}
                </>
              ) : (
                <Message>
                  <p>You haven't been assigned a shift yet.</p>
                </Message>
              )}
            </Card>

            <Card className="tof-wrapper">
              <div className="title">
                <h5>Your Weekly Availability</h5>
              </div>
              {employee && employee.availabilities.length ? (
                <Availability availabilities={employee.availabilities} />
              ) : (
                <Message>You have no availabilities to display.</Message>
              )}
            </Card>

            <Card className="tof-wrapper">
              <div className="title">
                <h5>Your Time Off Requests</h5>
                {employee && employee.time_off.length ? (
                  <Message>
                    <>
                      {employee.time_off.map(item => (
                        <TimeOffApproved
                          key={item.id}
                          status={item.status}
                          start={item.start}
                          reason={item.reason}
                          deleteExpiredRequest={() =>
                            this.deleteExpiredRequest(
                              item.id,
                              this.props.auth.token
                            )
                          }
                        />
                      ))}
                    </>
                  </Message>
                ) : (
                  <Message>No requests to display.</Message>
                )}
              </div>
            </Card>

            <Card>
              <div className="title">
                <h5>Request Time Off</h5>
              </div>
              <TimeOffRequest />
            </Card>
          </div>
        </Container>
      </OuterContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    employee: state.employee.employee,
    error: state.error,
    auth: state.auth,
    employees: state.employees.employees,
    hours: state.hours.hours
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
