import React from 'react'
import Calendar from '../Calendar'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import EmployeePool from './EmployeePool'

const DnDCal = withDragAndDrop(Calendar, { backend: false })

class Scheduler extends React.Component {
  state = { events: [] }
  ComponentDidMount() {}

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <EmployeePool />
        <DnDCal
          selectable
          resizable
          defaultDate={new Date()}
          defaultView="week"
          events={this.state.events}
          onEventDrop={event => console.log(event)}
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

console.log(HTML5Backend)
export default DragDropContext(HTML5Backend)(Scheduler)
