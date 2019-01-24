import React from 'react'
import moment from 'moment'

const TimeOffApproved = ({
  id,
  status,
  date,
  reason,
  deleteExpiredRequest
}) => {
  return (
    <div className="details" key={id}>
      <div className="box">
        <div className="date">
          <h6>Date</h6>
          <p data-testid="date">{moment(date).format('MMM Do')}</p>
        </div>
        <div className="reason">
          <h6>Reason</h6>
          <p data-testid="reason">{reason}</p>
          {/* needs logic added to the button to remove the request */}
        </div>
        <div className="status">
          <h6>Status</h6>
          <div className="status-and-delete">
            <p>{status}</p>
            <i className="fas fa-backspace" onClick={deleteExpiredRequest} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeOffApproved
