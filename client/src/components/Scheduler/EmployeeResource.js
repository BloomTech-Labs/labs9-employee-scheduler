import React from 'react'
import EmployeeCard from './ResourceCard'
import circle from '../../assets/img/circle.svg'

class EmployeeResource extends React.Component {
  componentDidMount() {
    // const { connectDragPreview } = this.props
    const img = new Image()
    img.src = circle
    // img.onload = () => connectDragPreview(img)
  }
  render() {
    const { employee, updateDragState } = this.props

    return (
      <div
        style={{ cursor: 'grab' }}
        onDragStart={() => {
          updateDragState(employee)
        }}
        onDragEnd={() => {
          updateDragState(null)
        }}
      >
        <EmployeeCard {...employee} view="pool" />
      </div>
    )
  }
}

export default EmployeeResource
