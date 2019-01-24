import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DropCal from './DropCal'
import EmployeePool from './EmployeePool'
import Button from '../common/Button'
import styled from '@emotion/styled'
import system from '../../design/theme'
import {
  fetchEmployeesFromDB,
  fetchHoursFromDB,
  createEvent,
  changeEvent,
  deleteEvent
} from '../../actions'
import { getHoursOfOperationRange, getRange } from '../../utils'

import WeekSummary from './WeekSummary'

const MEDIUM_BP = Number.parseInt(system.breakpoints[1].split(' ')[1])
const SMALL_BP = Number.parseInt(system.breakpoints[0].split(' ')[1])

class Scheduler extends React.Component {
  state = {
    draggedEmployee: null,
    range: null,
    width: 'desktop',
    view: 'week',
    date: new Date(),
    range: getRange({ view: 'week', date: new Date() })
  }

  componentDidMount() {
    this.fetchData()
    this.updateWidth()
    window.addEventListener('resize', this.updateWidth)
  }

  componentDidUpdate() {
    if (this.props.employees && this.props.hours) {
      this.getScheduleCoverage()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth)
  }

  fetchData() {
    const { organization_id } = this.props.user
    this.props.fetchEmployeesFromDB(organization_id, this.props.token)
    this.props.fetchHoursFromDB(organization_id, this.props.token)
  }

  updateWidth = () => {
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )

    if (Number.parseInt(width) < SMALL_BP) {
      return this.setState({
        width: 'mobile',
        view: 'day',
        range: getRange({ view: 'day', date: this.state.date })
      })
    } else if (Number.parseInt(width) < MEDIUM_BP) {
      return this.setState({
        width: 'tablet',
        view: 'day',
        range: getRange({ view: 'day', date: this.state.date })
      })
    } else {
      return this.setState({
        width: 'desktop',
        view: 'week',
        range: getRange({ view: 'week', date: this.state.date })
      })
    }
  }

  toggleView = () => {
    if (this.state.view === 'week') {
      return this.setState({
        view: 'day',
        range: getRange({ view: 'day', date: this.state.date })
      })
    } else {
      return this.setState({
        view: 'week',
        range: getRange({ view: 'week', date: this.state.date })
      })
    }
  }

  changeDate = direction => {
    this.setState(({ date, view }) => {
      let returnVal = new Date()
      let day = 1000 * 60 * 60 * 24
      const inc = view === 'week' ? 7 * day : day
      if (direction === 'left') {
        returnVal = new Date(date.getTime() - inc)
      } else if (direction === 'right') {
        returnVal = new Date(date.getTime() + inc)
      }
      const range = getRange({ view, date: returnVal })
      console.log(range)
      return { date: returnVal, range }
    })
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

    console.log(`${percentCoverage}% coverage`)
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
      this.props.changeEvent(
        { event: employee, changes: { start, end } },
        this.props.token
      )
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

  updateDragState = (draggedEmployee = null) =>
    this.setState({ draggedEmployee })

  render() {
    const { employees, hours } = this.props
    const { width, range, view, date } = this.state

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
    console.log(view)
    return (
      <Container>
        {width !== 'mobile' ? (
          <EmployeePool
            employees={employees}
            updateDragState={this.updateDragState}
            width={width}
          />
        ) : null}
        <div style={{ display: 'flex', flexFlow: 'column', flex: '1 1' }}>
          <CalendarButtons>
            <div>
              <Button
                onClick={() => this.changeDate('left')}
                style={{ alignSelf: 'flex-end' }}
              >
                Back
              </Button>
              <Button
                onClick={() => this.changeDate('today')}
                style={{ alignSelf: 'flex-end' }}
              >
                Today
              </Button>
              <Button
                onClick={() => this.changeDate('right')}
                style={{ alignSelf: 'flex-end' }}
              >
                Next
              </Button>
            </div>
            <div>
              {width === 'desktop' ? (
                <Button
                  onClick={this.toggleView}
                  style={{ alignSelf: 'flex-end', marginRight: '20px' }}
                >
                  Toggle View
                </Button>
              ) : null}
            </div>
          </CalendarButtons>
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
            min={hourRange.min}
            max={hourRange.max}
            view={view}
            date={date}
          />
          <WeekSummary
            range={
              range
                ? range
                : {
                    start: moment().startOf('week')._d,
                    end: moment().endOf('week')._d
                  }
            }
            events={events}
          />
        </div>
      </Container>
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

const Container = styled.div`
  display: flex;

  @media ${system.breakpoints[0]} {
    flex-direction: column;
  }
`
const CalendarButtons = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media ${system.breakpoints[1]} {
    justify-content: center;
  }
`
