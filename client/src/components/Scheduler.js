import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import EmployeeCard from './EmployeeCard/Card'
import { DragDropContext, DragSource } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

const localizer = BigCalendar.momentLocalizer(moment)

const DnDCal = withDragAndDrop(BigCalendar, { backend: false })

const employees = [{ name: 'Eric', id: 1 }, { name: 'Susan', id: 2 }]

const EmployeeEvent = props => {
  const { connectDragSource, event } = props
  const EventWrapper = BigCalendar.components.eventWrapper
  return (
    <EventWrapper event={event}>
      {connectDragSource(
        <div>
          <EmployeeCard
            style={{ backgroundColor: props.isDragging ? 'red' : undefined }}
          />
        </div>
      )}
    </EventWrapper>
  )
}

const eventSource = {
  beginDrag(props) {
    return { event: props.event, anchor: 'drop' }
  },
  endDrag(props) {
    console.log(props)
  }
}

const collectSource = (connect, monitor) => {
  return {
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource()
  }
}
const ConnectedEmployee = DragSource('event', eventSource, collectSource)(
  EmployeeEvent
)

class Scheduler extends React.Component {
  state = { events: [] }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div>
          {employees.map(employee => (
            <ConnectedEmployee key={employee.id} event={employee} />
          ))}
        </div>
        <DnDCal
          selectable
          resizable
          defaultDate={new Date()}
          defaultView="week"
          events={this.state.events}
          onEventDrop={event => console.log(event)}
          onEventResize={event => console.log(event)}
          onSelectEvent={event => console.log(event)}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          draggableAccessor={event => true}
        />
      </div>
    )
  }
}
export default DragDropContext(HTML5Backend)(Scheduler)
