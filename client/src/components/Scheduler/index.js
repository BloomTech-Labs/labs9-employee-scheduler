import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DropCal from './DropCal'
import EmployeePool from './EmployeePool'
import Button from '../common/Button'
import system from '../../design/theme'
import {
  fetchEmployeesFromDB,
  fetchHoursFromDB,
  createEvent,
  changeEvent,
  deleteEvent
} from '../../actions'
import { getHoursOfOperationRange, getRange } from '../../utlls'

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
      return this.setState({ width: 'mobile', view: 'day' })
    } else if (Number.parseInt(width) < MEDIUM_BP) {
      return this.setState({ width: 'tablet', view: 'day' })
    } else {
      return this.setState({ width: 'desktop', view: 'week' })
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

    const shifts = employees.reduce(
      (acc, { events }) => [...acc, ...events],
      []
    )
    console.log(shifts)
  }

  validateEvent = ({ userId, eventTimes }) => {
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
      <div style={{ display: 'flex' }}>
        <EmployeePool
          employees={employees}
          updateDragState={this.updateDragState}
        />
        <div style={{ display: 'flex', flexFlow: 'column', flexGrow: '1' }}>
          {width === 'desktop' ? (
            <Button onClick={this.toggleView} style={{ alignSelf: 'flex-end' }}>
              View Update
            </Button>
          ) : null}
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
