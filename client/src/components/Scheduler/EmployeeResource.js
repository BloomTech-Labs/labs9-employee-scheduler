import React from 'react'
import { DragSource } from 'react-dnd'
import EmployeeCard from '../EmployeeCard/Card'
import circle from '../../img/circle.svg'
import styled from '@emotion/styled'
import system from '../../design/theme'

class EmployeeEvent extends React.Component {
  componentDidMount() {
    const { connectDragPreview } = this.props
    const img = new Image()
    img.src = circle
    img.onload = () => connectDragPreview(img)
  }
  render() {
    const { connectDragSource, isDragging, employee } = this.props

    return connectDragSource(
      <div style={{ opacity: isDragging ? '.7' : undefined }}>
        <EmployeeCard {...employee} />
      </div>
    )
  }
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
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  }
}

const DragNameCard = styled.h2`
  padding: ${system.spacing.bigPadding};
  font-size: ${system.fontSizing.ml};
`

export default DragSource('SHIFT', eventSource, collectSource)(EmployeeEvent)
