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

  moveEvent = drop => {
    const { event, start, end } = drop
    const { type, ...employee } = event

    return this.props.changeEvent({ event: employee, changes: { start, end } })
  }

  resizeEvent = ({ end, start, event }) => {
    this.props.changeEvent({ event, changes: { start, end } })
  }

  createEvent = ({ start, end }) => {
    const { draggedEmployee } = this.state
    if (draggedEmployee) {
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

    // calculate hour ranges
    let hourRange = (function() {
      let firstDay = hours.find(day => !day.closed)
      let numRange =
        !hours.length || !firstDay
          ? // make sure hours of operation have been received and there is
            // an open day, otherwise do full day range
            { min: 0, max: 24 }
          : hours.reduce(
              (acc, day) => {
                let returnVal = { ...acc }
                const dayStart = day.open_time
                const dayEnd = day.close_time

                if (day.closed) {
                  return returnVal
                }
                if (dayStart < acc.min) {
                  returnVal.min = dayStart
                }
                if (dayEnd > acc.max) {
                  returnVal.max = dayEnd
                }
                return returnVal
              },
              {
                min: hours[0].open_time,
                max: hours[0].close_time
              }
            )
      // convert hour ranges into dates as this is what react-big-calendar consumes
      let today = new Date()
      return {
        min: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          Math.floor(numRange.min)
        ),
        max: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          Math.ceil(numRange.max) - 1,
          59
        )
      }
    })()

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
