import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DropCal from './DropCal'
import EmployeePool from './EmployeePool'
import {
  fetchEmployeesFromDB,
  createEvent,
  changeEvent,
  deleteEvent
} from '../../actions'

import WeekSummary from './WeekSummary'

class Scheduler extends React.Component {
  state = {
    draggedEmployee: null
  }

  componentDidMount() {
    this.props.fetchEmployeesFromDB()
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

  updateDragState = (draggedEmployee = null) =>
    this.setState({ draggedEmployee })

  render() {
    const { employees } = this.props

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
          />
          <WeekSummary events={events} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ employees }) => ({ employees: employees.employees })

const DragSched = DragDropContext(HTML5Backend)(Scheduler)
export default connect(
  mapStateToProps,
  { fetchEmployeesFromDB, createEvent, changeEvent, deleteEvent }
)(DragSched)
