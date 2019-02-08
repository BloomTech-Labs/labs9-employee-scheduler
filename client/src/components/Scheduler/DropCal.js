import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import withDragAndDrop from 'cadence-big-calendar/lib/addons/dragAndDrop'
import Calendar from '../common/Calendar'
import styled from '@emotion/styled'
import lines from '../../assets/img/lines.svg'

const DnDCal = withDragAndDrop(Calendar)

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const click = (x, y) => {
  const eventConfig = {
    bubbles: true,
    button: 0,
    clientX: x,
    clientY: y,
    pageX: window.scrollLeft + x,
    pageY: window.scrollRight + y,
    view: window,
    which: 1,
    x: x,
    y: y
  }

  let mouseDown = new window.MouseEvent('mousedown', eventConfig)
  let mouseUp = new window.MouseEvent('mouseup', eventConfig)
  const elem = document.elementFromPoint(x, y)
  elem.dispatchEvent(mouseDown)
  elem.dispatchEvent(mouseUp)
}

const dropSpec = {
  drop(props, monitor, component) {
    const { x, y } = monitor.getClientOffset()
    // dispatch a DOM click event at the place of dropping, so react-big-cal
    // library can take over event creation
    click(x, y)
  }
}

class DropCal extends Component {
  state = { hoursModal: false }

  toggleModal = e => {
    this.setState(state => ({ hoursModal: !state.hoursModal }))
  }

  render() {
    const {
      connectDropTarget,
      events,
      eventPropGetter,
      names,
      onEventDrop,
      onEventResize,
      onSelectSlot,
      onSelectEvent,
      onRangeChange,
      min,
      max,
      views,
      view,
      defaultView,
      date,
      slotPropGetter,
      onDragStart
    } = this.props
    return connectDropTarget(
      <div id="calendar">
        <StyledDndCal
          popup
          selectable
          resizable
          defaultDate={new Date()}
          startAccessor="start"
          endAccessor="end"
          events={events}
          eventPropGetter={eventPropGetter}
          names={names}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          onRangeChange={onRangeChange}
          onDragStart={onDragStart}
          min={min}
          max={max}
          views={views}
          view={view}
          defaultView={defaultView}
          date={date}
          onView={() => {}}
          onNavigate={() => {}}
          slotPropGetter={slotPropGetter}
          longPressThreshold={100}
        />
      </div>
    )
  }
}

export default DropTarget('SHIFT', dropSpec, dropCollect)(DropCal)

const StyledDndCal = styled(DnDCal)`
  &.rbc-addons-dnd
    .rbc-addons-dnd-resize-ns-anchor
    .rbc-addons-dnd-resize-ns-icon {
    height: 15px;
    padding: 5px;
    background-image: url(${lines});
    background-size: contain;
    background-repeat: no-repeat;
    width: 20px;
    border: none;
  }
`
