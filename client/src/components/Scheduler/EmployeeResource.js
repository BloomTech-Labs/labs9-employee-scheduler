import React from 'react'
import { DragSource } from 'react-dnd'
import EmployeeCard from '../EmployeeCard/Card'
import styled from '@emotion/styled'

const EmployeeEvent = props => {
  const { connectDragSource, employee, updateDragState } = props
  return connectDragSource(
    <div style={{ opacity: props.isDragging ? '.7' : undefined }}>
      <EmployeeCard {...employee} />
    </div>
  )
}

const eventSource = {
  beginDrag(props) {
    const { employee, updateDragState } = props
    updateDragState(employee)
    return {}
  },
  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      props.updateDragState(null)
    }
  }
}

const collectSource = (connect, monitor) => {
  return {
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource()
  }
}

export default DragSource('SHIFT', eventSource, collectSource)(EmployeeEvent)
