import React from 'react'
import EmployeeCard from './ResourceCard'
import circle from '../../assets/img/circle.svg'

class EmployeeResource extends React.Component {
  previewImg = null

  componentDidMount() {
    this.previewImg = new Image()
    this.previewImg.src = circle
  }

  render() {
    const { employee, updateDragState } = this.props

    return (
      <div
        style={{ cursor: 'grab' }}
        onDragStart={e => {
          if (this.previewImg) {
            e.dataTransfer.setDragImage(this.previewImg, 0, 0)
          }
          updateDragState(employee)
        }}
        onDragEnd={() => {
          updateDragState(null)
        }}
        draggable={true}
      >
        <EmployeeCard {...employee} view="pool" />
      </div>
    )
  }
}

export default EmployeeResource
