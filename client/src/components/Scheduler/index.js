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

  componentDidUpdate() {
    if (this.props.employees && this.props.hours) {
      this.getScheduleCoverage()
    }
  }

  fetchData() {
    this.props.fetchEmployeesFromDB()
    const { organization_id } = this.props.user
    this.props.fetchHoursFromDB(organization_id, this.props.token)
    this.props.fetchHoursFromDB(this.props.token)
  }

  getScheduleCoverage = () => {
    const { hours, employees } = this.props

    // combine all shifts into a single array
    const shifts = employees.reduce(
      (acc, { events }) => [...acc, ...events],
      []
    )

    // initialize an object keyed by all open days on the schedule
    const days = hours.reduce(
      (acc, { day, closed }) => (!closed ? { ...acc, [day]: [] } : { ...acc }),
      {}
    )

    // populate days object with all corresponding shifts
    shifts.forEach(shift => {
      const shiftDay = moment(shift.start).day()
      if (days[shiftDay]) {
        days[shiftDay].push(shift)
      }
    })

    // for each day
    Object.keys(days).forEach(key => {
      // sort shifts by start time
      const sortedShifts = days[key].sort((a, b) =>
        moment(a.start).isAfter(b.start)
      )

      // merge shifts
      // take shifts and combine them into blocks of time
      const mergedShifts = sortedShifts.reduce((acc, { start, end }) => {
        if (!acc.length) {
          // start by initializing with first shift
          return [{ start, end }]
        } else {
          if (moment(start).isAfter(acc[acc.length - 1].end)) {
            // if shifts are not overlapping
            return [...acc, { start, end }]
          } else if (moment(end).isBefore(acc[acc.length - 1].end)) {
            // if new shift exists within previous block
            return [...acc]
          } else {
            // if we need to replace last block with a combined block
            return [
              ...acc.slice(0, acc.length - 1),
              { start: acc[acc.length - 1].start, end }
            ]
          }
        }
      }, [])

      console.log('MERGED SHIFTS')
      console.log(mergedShifts)

      // calculate total shift coverage in hours
      const totalHoursCovered = mergedShifts.reduce((acc, { start, end }) => {
        return acc + moment.duration(moment(end).diff(start)).asHours()
      }, 0)

      console.log(totalHoursCovered)

      //   const totalHoursCovered = 0

      //   mergedShifts.forEach(({ start, end }) => {
      //     const blockDuration = moment.duration(moment(end).diff(start)).asHours()
      //     console.log(blockDuration)
      //   })
    })
  }

  validateEvent = ({ userId, eventTimes }) => {
    // also block:
    // 1. shift collisions
    // 2. if store is closed
    const employee = this.props.employees.filter(({ id }) => id === userId)[0]

    // step 1
    // check for conflicts with approved day off requests
    let conflicts = false

    employee.time_off_requests.forEach(({ date, status }) => {
      if (
        status === 'approved' &&
        moment(eventTimes.start).isSame(date, 'day')
      ) {
        conflicts = true
      }
    })

    if (conflicts) {
      window.alert(
        'Cannot schedule an employee during an approved time off request'
      )
      return false
    }

    // step 2
    // check for the event falling inside an availability window
    const availabilityForDay =
      employee.availabilities.filter(
        ({ day }) => day === moment(eventTimes.start).day()
      )[0] || null

    if (!availabilityForDay) {
      window.alert(
        'Cannot schedule an employee on a day they are not available'
      )
      return false
    }

    // start time must be earlier than or the same as eventTimes.start
    // end_time must be later than or the same as eventTimes.end
    if (
      !(availabilityForDay.start_time <= moment(eventTimes.start).hour()) ||
      !(availabilityForDay.end_time >= moment(eventTimes.end).hour())
    ) {
      window.alert(
        'Cannot schedule an employee outside their availability window'
      )
      return false
    }

    // if everything went okay
    return true
  }

  moveEvent = drop => {
    const { event, start, end } = drop
    const { type, ...employee } = event
    if (
      this.validateEvent({
        userId: employee.user_id,
        eventTimes: { start, end }
      })
    ) {
      this.props.changeEvent({ event: employee, changes: { start, end } })
    }
  }

  resizeEvent = ({ end, start, event }) => {
    if (
      this.validateEvent({ userId: event.user_id, eventTimes: { start, end } })
    ) {
      this.props.changeEvent({ event, changes: { start, end } })
    }
  }

  createEvent = ({ start, end }) => {
    const { draggedEmployee } = this.state
    if (draggedEmployee) {
      if (
        this.validateEvent({
          userId: draggedEmployee.id,
          eventTimes: { start, end }
        })
      ) {
        this.props.createEvent({ employee: draggedEmployee, start })
        this.setState({ draggedEmployee: null })
      }
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
