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
    return (
      <div style={{ display: 'flex' }}>
        <EmployeePool employees={employees} />
        <DnDCal
          selectable
          resizable
          defaultDate={new Date()}
          defaultView="week"
          events={this.state.events}
          onEventDrop={this.createEvent}
          onEventResize={event => console.log(event)}
          onSelectEvent={event => console.log(event)}
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
