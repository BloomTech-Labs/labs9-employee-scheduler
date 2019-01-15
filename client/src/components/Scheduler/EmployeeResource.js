import React from 'react'
import { DragSource } from 'react-dnd'
import EmployeeCard from '../EmployeeCard/Card'

const EmployeeEvent = props => {
  const { connectDragSource, event } = props
  console.log(props)
  return connectDragSource(
    <div style={{ opacity: props.isDragging ? '.7' : undefined }}>
      <EmployeeCard />
    </div>
  )
}

const eventSource = {
  beginDrag(props) {
    return { event: props.event, anchor: 'drop' }
  },
  endDrag(props) {
    console.log(props)
  }
}

const collectSource = (connect, monitor) => {
  return {
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource()
  }
}

export default DragSource('event', eventSource, collectSource)(EmployeeEvent)
