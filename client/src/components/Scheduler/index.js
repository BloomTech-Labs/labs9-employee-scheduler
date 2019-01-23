import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DropCal from './DropCal'
import EmployeePool from './EmployeePool'
import {
  fetchEmployeesFromDB,
  fetchHoursFromDB,
  createEvent,
  changeEvent,
  deleteEvent
} from '../../actions'
import { getHoursOfOperationRange } from '../../utlls'

import WeekSummary from './WeekSummary'

class Scheduler extends React.Component {
  state = {
    draggedEmployee: null,
    range: null
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.props.fetchEmployeesFromDB()
    const { organization_id } = this.props.user
    this.props.fetchHoursFromDB(organization_id, this.props.token)
    this.props.fetchHoursFromDB(this.props.token)
  }

  validateEvent = ({ userId, eventTimes }) => {
    const employee = this.props.employees.filter(({ id }) => id === userId)[0]
    console.log(employee)

    let conflicts = false

    // step 1
    // check for conflicts with approved day off requests
    employee.time_off_requests.forEach(({ date, status }) => {
      if (
        status === 'approved' &&
        moment(eventTimes.start).isSame(date, 'day')
      ) {
        console.log('conflict with approved time off request')
        conflicts = true
      }
    })

    // step 2
    // grab day from eventTimes.start, compare to availabilities
    const availableDays = employee.availabilities.reduce(
      (acc, { day }) => [...acc, day],
      []
    )

    if (!availableDays.includes(moment(eventTimes.start).day())) {
      console.log('conflict with day off')
      conflicts = true
    }

    // step 3
    // compare start and end times to availabilities

    employee.availabilities.forEach(({ day, start_time, end_time }) => {
      if (moment(eventTimes.start).day() === day) {
        console.log('conflict with availabilities')
      }
    })
  }

  moveEvent = drop => {
    const { event, start, end } = drop
    const { type, ...employee } = event
    this.validateEvent({ userId: employee.user_id, eventTimes: { start, end } })

    return this.props.changeEvent({ event: employee, changes: { start, end } })
  }

  resizeEvent = ({ end, start, event }) => {
    this.validateEvent({ userId: event.user_id, eventTimes: { start, end } })
    this.props.changeEvent({ event, changes: { start, end } })
  }

  createEvent = ({ start, end }) => {
    const { draggedEmployee } = this.state
    if (draggedEmployee) {
      this.validateEvent({
        userId: draggedEmployee.id,
        eventTimes: { start, end }
      })
      this.props.createEvent({ employee: draggedEmployee, start })
      this.setState({ draggedEmployee: null })
    }
  }

  deleteEvent = event => {
    const { title, start, end } = event
    const eventText = `${title}
    Begin: ${moment(start).format('ddd, MMMM Do, h:mm a')} 
    End: ${moment(end).format('ddd, MMMM Do, h:mm a')} 
    `
    const r = window.confirm(
      'Would you like to cancel this shift?\n\n' + eventText
    )

    if (r) {
      return this.props.deleteEvent(event)
    }
  }

  updateRange = range => {
    if (Array.isArray(range) && range.length === 1) {
      this.setState({
        range: {
          start: moment(range[0]).startOf('day')._d,
          end: moment(range[0]).endOf('day')._d
        }
      })
    } else if (Array.isArray(range)) {
      this.setState({
        range: range
      })
    } else {
      this.setState({
        range: {
          start: moment(range.start).startOf('day')._d,
          end: moment(range.end).endOf('day')._d
        }
      })
    }
  }

  updateDragState = (draggedEmployee = null) =>
    this.setState({ draggedEmployee })

  render() {
    const { employees, hours } = this.props

    const names = []
    employees.map(employee => names.push(`${employee.first_name}`))

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
      <div style={{ display: 'flex' }}>
        <EmployeePool
          employees={employees}
          updateDragState={this.updateDragState}
        />
        <div style={{ display: 'flex', flexFlow: 'column', width: '100%' }}>
          <DropCal
            popover
            events={events}
            eventPropGetter={event => ({
              className: event.title.split(' ')[0]
            })}
            names={names}
            updateDragState={this.updateDragState}
            onEventDrop={this.moveEvent}
            onEventResize={this.resizeEvent}
            onSelectSlot={this.createEvent}
            onSelectEvent={this.deleteEvent}
            onRangeChange={this.updateRange}
            min={hourRange.min}
            max={hourRange.max}
          />
          <WeekSummary
            range={
              this.state.range
                ? this.state.range
                : {
                    start: moment().startOf('week')._d,
                    end: moment().endOf('week')._d
                  }
            }
            events={events}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ employees, hours, auth }) => ({
  employees: employees.employees,
  hours: hours.hours,
  user: auth.user,
  token: auth.token
})

const DragSched = DragDropContext(HTML5Backend)(Scheduler)
export default connect(
  mapStateToProps,
  {
    fetchEmployeesFromDB,
    fetchHoursFromDB,
    createEvent,
    changeEvent,
    deleteEvent
  }
)(DragSched)
