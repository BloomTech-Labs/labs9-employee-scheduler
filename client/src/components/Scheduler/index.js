import React from 'react'
import { connect } from 'react-redux'
import Calendar from '../Calendar'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import EmployeePool from './EmployeePool'
import { fetchEmployeesFromDB, createEvent } from '../../actions'

const DnDCal = withDragAndDrop(Calendar, { backend: false })

class Scheduler extends React.Component {
  state = { events: [] }

  componentDidMount() {
    this.props.fetchEmployeesFromDB()
  }

  handleDrop = drop => {
    console.log('drop', drop)
    const { event, start } = drop
    const { type, ...employee } = event
    if (event.type === 'new_shift') {
      this.props.createEvent({ employee, start })
    }
  }

  render() {
    const { employees } = this.props
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
        <EmployeePool employees={employees} />
        <DnDCal
          selectable
          resizable
          defaultDate={new Date()}
          defaultView="week"
          events={events}
          onEventDrop={this.handleDrop}
          onEventResize={event => console.log('resize', event)}
          onSelectEvent={event => console.log('select', event)}
          startAccessor="start"
          endAccessor="end"
          draggableAccessor={event => true}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ employees }) => ({ employees: employees.employees })

const DragSched = DragDropContext(HTML5Backend)(Scheduler)
export default connect(
  mapStateToProps,
  { fetchEmployeesFromDB, createEvent }
)(DragSched)
