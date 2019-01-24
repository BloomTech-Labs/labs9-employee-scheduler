import React from 'react'
import moment from 'moment'
import DeleteButton from '../common/DeleteButton'

const TimeOffApproved = ({ id, status, date, reason }) => {
  return (
    <div className="details" key={id}>
      <div className="box">
        <div className="date">
          <h6>Date</h6>
          <p data-testid="date">{moment(date).format('MMM Do, h:mma')}</p>
        </div>
        <div className="reason">
          <h6>Reason</h6>
          <p data-testid="reason">{reason}</p>
          {/* needs logic added to the button to remove the request */}
        </div>
        <div className="status">
          <h6>Status</h6>
          <p>{status}</p>
        </div>
      </div>
      <DeleteButton
        deleteExpiredRequest={() => this.deleteExpiredRequest(id)}
      />
    </div>
  )
}

export default TimeOffApproved

TimeOffApproved.propTypes = {
  // adding propTypes here
}
