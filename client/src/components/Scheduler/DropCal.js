import React, { Component } from 'react'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import Calendar from '../common/Calendar'
import styled from '@emotion/styled'
import lines from '../../assets/img/lines.svg'

const DnDCal = withDragAndDrop(Calendar)

class DropCal extends Component {
  state = { hoursModal: false }

  toggleModal = e => {
    this.setState(state => ({ hoursModal: !state.hoursModal }))
  }

  render() {
    const {
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
      onDragStart,
      onDropFromOutside
    } = this.props
    return (
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
          onDropFromOutside={onDropFromOutside}
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

export default DropCal
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
