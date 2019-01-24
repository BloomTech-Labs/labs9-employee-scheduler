import React from 'react'
import moment from 'moment'

const AssignedShifts = ({ id, start, end, time }) => {
  return (
    <div className="details" key={id}>
      <div className="date">
        <p>
          {moment(start).format('MMM Do, h:mma')} to{' '}
          {moment(end).format('h:mma')}
        </p>
      </div>
      <div>
        <p>{time}</p>
      </div>
    </div>
  )
}

export default AssignedShifts
