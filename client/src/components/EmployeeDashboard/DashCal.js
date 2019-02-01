import React, { Component } from 'react'
import Calendar from '../Calendar'
import styled from '@emotion/styled'
import lines from '../../img/lines.svg'

class DashCal extends Component {
  render() {
    const { events, names, min, max, view } = this.props
    return (
      <div id="calendar">
        <StyledCal
          events={events}
          names={names}
          min={min}
          max={max}
          view={view}
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
