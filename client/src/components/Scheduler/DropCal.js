import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import Calendar from '../Calendar'
import propTypes from 'prop-types'
import HoursOfOperationModal from '../HoursOfOperationModal'
import Button from '../common/Button'
import styled from '@emotion/styled'
import system from '../../design/theme'
import { connect } from 'react-redux'
import { compose } from 'redux'

const mapStateToProps = ({ coverage }) => ({ coverage })

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
      coverage
    } = this.props

    return connectDropTarget(
      <div style={{ width: '100%' }}>
        <ButtonHolder>
          <Coverage>{`${coverage}% coverage`}</Coverage>
          <Button onClick={this.toggleModal}>Edit Hours of Operation</Button>
        </ButtonHolder>
        <HoursOfOperationModal hidden={!this.state.hoursModal} />
        <DnDCal
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
        />
      </div>
    )
  }
}

export default compose(
  DropTarget('SHIFT', dropSpec, dropCollect),
  connect(
    mapStateToProps,
    null
  )
)(DropCal)

const ButtonHolder = styled.div`
  z-index: 7;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding-right: 20px;
`

const Coverage = styled.div`
  border: 1px solid grey;
  margin-right: 30px;
  display: flex;
  align-items: center;
  border-radius: ${system.borders.radius};
  border: ${system.borders.transparent};
  color: ${system.color.neutral};
  background: ${system.color.primary};
  box-shadow: ${system.shadows.button};
  font-size: ${system.fontSizing.sm};
  padding: ${system.spacing.standardPadding};
  outline: none;
  margin-left: 10px;
`
