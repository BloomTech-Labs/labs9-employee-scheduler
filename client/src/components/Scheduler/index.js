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
  deleteEvent,
  displayCoverage
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
    const { organization_id } = this.props.user
    this.props.fetchEmployeesFromDB(organization_id, this.props.token)
    this.props.fetchHoursFromDB(organization_id, this.props.token)
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

    // initialize covered and open hours variables
    let totalHoursCovered = 0
    let totalHoursOpen = 0

    // for each day add number of covered and open hours
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

      // converts a moment into float
      const convertMomentToFloat = time =>
        moment(time).hours() + moment(time).minutes() / 60

      // converts a float into an object with hours and minutes
      const convertFloatToTime = num => {
        const [hours, fraction] = num.toString().split('.')
        const minutes =
          parseInt((60 * (fraction / 10)).toString().slice(0, 2)) || 0
        return [hours, minutes]
      }

      // truncate merged shifts to only open hours
      const truncatedShifts = mergedShifts.reduce((acc, { start, end }) => {
        // if schedule end is before shift start, discard shift
        // if schedule start is after shift end, discard shift
        // if shift start is before schedule start, truncate shift start
        // if shift end is after end, trucate shift end
        // otherwise do nothing

        // convert times to floats
        const shiftStartFloat = convertMomentToFloat(start)
        const shiftEndFloat = convertMomentToFloat(end)

        // run discard options first, then mutation options to make sure discards happen
        if (hours[key].close_time < shiftStartFloat) {
          // discard shift
          return [...acc]
        } else if (hours[key].open_time > shiftEndFloat) {
          // discard shift
          return [...acc]
        } else if (shiftStartFloat < hours[key].open_time) {
          // truncate start
          const diff = hours[key].open_time - shiftStartFloat
          const [hoursDiff, minutesDiff] = convertFloatToTime(diff)

          const newStart = moment(start)
            .add(hoursDiff, 'hours')
            .add(minutesDiff, 'minutes')
            .toISOString()

          return [...acc.slice(0, acc.length - 1), { start: newStart, end }]
        } else if (shiftEndFloat > hours[key].close_time) {
          // truncate end
          const diff = shiftEndFloat - hours[key].close_time
          const [hoursDiff, minutesDiff] = convertFloatToTime(diff)

          const newEnd = moment(end)
            .subtract(hoursDiff, 'hours')
            .subtract(minutesDiff, 'minutes')
            .toISOString()

          return [...acc.slice(0, acc.length - 1), { start, end: newEnd }]
        } else {
          // otherwise do nothing
          return [...acc, { start, end }]
        }
      }, [])

      // calculate shift coverage in hours
      const hoursCovered = truncatedShifts.reduce((acc, { start, end }) => {
        return acc + moment.duration(moment(end).diff(start)).asHours()
      }, 0)

      // calculate hours open
      const hoursOpen = hours[key].close_time - hours[key].open_time

      // increment the weekly totals accordingly
      totalHoursCovered += hoursCovered
      totalHoursOpen += hoursOpen
    })

    // calculate percentage
    const percentCoverage = Math.floor(
      (totalHoursCovered / totalHoursOpen) * 100
    )

    this.props.displayCoverage(percentCoverage)
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
        `Sorry, you can't schedule this employee during their approved time off.`
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
        `Sorry, the employee you're trying to schedule isn't available on this day.`
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
        `Sorry, you can't schedule this employee outside their availability window.`
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
      this.props.changeEvent(
        { event, changes: { start, end } },
        this.props.token
      )
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
        this.props.createEvent(
          { employee: draggedEmployee, start },
          this.props.token
        )
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
      return this.props.deleteEvent(event, this.props.token)
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
    deleteEvent,
    displayCoverage
  }
)(DragSched)
