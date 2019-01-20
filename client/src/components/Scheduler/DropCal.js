import React from 'react'
import { DropTarget } from 'react-dnd'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import Calendar from '../Calendar'

const DnDCal = withDragAndDrop(Calendar)

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const click = (x, y) => {
  let mouseDown = new window.MouseEvent('mousedown', {
    altKey: false,
    bubbles: true,
    button: 0,
    buttons: 1,
    cancelable: true,
    clientX: x,
    clientY: y,
    ctrlKey: false,
    isTrusted: true,
    metaKey: false,
    pageX: window.scrollLeft + x,
    pageY: window.scrollRight + y,
    shiftKey: false,
    // sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false},
    // srcElement: div.rbc - day - bg,
    // target: div.rbc - day - bg,
    // timeStamp: 22770.000000018626,
    // toElement: div.rbc - day - bg,
    view: window,
    which: 1,
    x: x,
    y: y
  })
  // mouseDown.cadence = true
  let mouseUp = new window.MouseEvent('mouseup', {
    altKey: false,
    bubbles: true,
    button: 0,
    buttons: 1,
    cancelable: true,
    clientX: x,
    clientY: y,
    ctrlKey: false,
    isTrusted: true,
    metaKey: false,
    pageX: window.scrollLeft + x,
    pageY: window.scrollRight + y,
    shiftKey: false,
    // sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false},
    // srcElement: div.rbc - day - bg,
    // target: div.rbc - day - bg,
    // timeStamp: 22770.000000018626,
    // toElement: div.rbc - day - bg,
    view: window,
    which: 1,
    x: x,
    y: y
  })
  const elem = document.elementFromPoint(x, y)
  elem.dispatchEvent(mouseDown)
  elem.dispatchEvent(mouseUp)
}

const dropSpec = {
  drop(props, monitor, component) {
    // Obtain the dragged item
    const item = monitor.getItem()
    console.log(component)
    const { x, y } = monitor.getClientOffset()
    click(x, y)
  }
}

const DropCal = ({
  connectDropTarget,
  events,
  eventPropGetter,
  names,
  onEventDrop,
  onEventResize,
  onSelectEvent
}) => {
  console.log()
  return connectDropTarget(
    <div>
      <DnDCal
        selectable
        resizable
        defaultDate={new Date()}
        defaultView="week"
        startAccessor="start"
        endAccessor="end"
        events={events}
        eventPropGetter={eventPropGetter}
        names={names}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectEvent={onSelectEvent}
      />
    </div>
  )
}

export default DropTarget('SHIFT', dropSpec, dropCollect)(DropCal)
