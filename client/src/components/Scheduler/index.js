import React from 'react'
import { connect } from 'react-redux'
import Calendar from '../Calendar'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import EmployeePool from './EmployeePool'
import { fetchEmployeesFromDB } from '../../actions'

const DnDCal = withDragAndDrop(Calendar, { backend: false })

class Scheduler extends React.Component {
  state = { events: [] }

  componentDidMount() {
    this.props.fetchEmployeesFromDB()
  }

  createEvent(event) {
    console.log(event)
    console.log(typeof event.start)
  }

  render() {
    const { employees } = this.props

    const names = []
    employees.map(employee => names.push(`${employee.first_name}`))

    const events = employees.reduce((acc, employee) => {
      return [
        ...acc,
        ...employee.events.map(event => {
          // console.log(typeof event.start)
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
          onEventDrop={this.createEvent}
          onEventResize={event => console.log(event)}
          onSelectEvent={event => console.log(event)}
          eventPropGetter={event => ({ className: event.title.split(' ')[0] })}
          names={names}
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
  { fetchEmployeesFromDB }
)(DragSched)
