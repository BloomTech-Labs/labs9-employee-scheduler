import React, { Component } from 'react'
import Calendar from '../Calendar'
import styled from '@emotion/styled'
import lines from '../../img/lines.svg'

class DashCal extends Component {
  render() {
    const {
      events,
      names,
      min,
      max,
      views,
      view,
      defaultView,
      date,
      slotPropGetter
    } = this.props
    return (
      <div id="calendar">
        <StyledCal
          popup
          selectable
          resizable
          defaultDate={new Date()}
          startAccessor="start"
          endAccessor="end"
          events={events}
          // eventPropGetter={eventPropGetter}
          names={names}
          onEventResize
          // onRangeChange={onRangeChange}
          min={min}
          max={max}
          view={view}
          date={date}
          onView={() => {}}
          onNavigate={() => {}}
        />
      </div>
    )
  }
}

export default DashCal

const StyledCal = styled(Calendar)`
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
