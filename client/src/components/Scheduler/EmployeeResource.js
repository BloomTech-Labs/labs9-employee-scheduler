import React from 'react'
import { DragSource } from 'react-dnd'
import EmployeeCard from '../EmployeeCard/Card'
import styled from '@emotion/styled'

const EmployeeEvent = props => {
  const { connectDragSource, event, employee } = props
  return connectDragSource(
    <div style={{ opacity: props.isDragging ? '.7' : undefined }}>
      <EmployeeCard {...employee} />
    </div>
  )
}

const eventSource = {
  beginDrag(props) {
    return { event: { ...props.employee, type: 'new_shift' }, anchor: 'drop' }
  },
  endDrag(props) {}
}

const collectSource = (connect, monitor) => {
  return {
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource()
  }
}

export default DragSource('SHIFT', eventSource, collectSource)(EmployeeEvent)
