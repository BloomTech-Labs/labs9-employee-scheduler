import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { withDragAndDrop } from 'react-big-calendar/lib/addons/dragAndDrop'

BigCalendar.momentLocalizer(moment)
const DnDCal = withDragAndDrop(BigCalendar, { backend: false })

class Scheduler extends React.Component {
  state = { events: [] }

  render() {
    return (
      <div>
        <div>

        <div />
        <DnDCal />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Scheduler)
