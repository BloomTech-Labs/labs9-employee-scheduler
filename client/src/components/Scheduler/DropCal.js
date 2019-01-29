import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import Calendar from '../Calendar'
import propTypes from 'prop-types'
import Button from '../common/Button'
import styled from '@emotion/styled'
import system from '../../design/theme'
import lines from '../../img/lines.svg'
import ReactTooltip from 'react-tooltip'

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
      coverage,
      slotPropGetter
    } = this.props
    return connectDropTarget(
      //tooltip added to help the user better understand how to use the calendar
      <div data-tip="Click and drag to adjust length or day of shift.  Single click to delete.">
        <ReactTooltip type="dark" effect="solid" place="left" />
        <StyledDndCal
          popup
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
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          onRangeChange={onRangeChange}
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
  .rbc-addons-dnd-resize-ns-anchor .rbc-addons-dnd-resize-ns-icon {
    height: 15px;
    padding: 5px;
    background-image: url(${lines});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 20px;
    border: none;
  }
`
