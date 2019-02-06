import React from 'react'
import moment from 'moment'
import system from '../../design/theme'
import styled from '@emotion/styled'

const AssignedShifts = ({ id, start, end, time }) => {
  return (
    <Shifts key={id} data-testid="shift">
      <p data-testid="shift_day">{moment(start).format('MMM Do')}</p>
      <span data-testid="shift_time">{`${moment(start).format(
        'h:mm a'
      )} - ${moment(end).format('h:mm a')}`}</span>
    </Shifts>
  )
}

export default AssignedShifts

// The below code is the same as Avails in Availability.js
export const Shifts = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
  padding: 1rem 0;
  border-bottom: 1px solid ${system.color.neutral};

  :last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  p {
    font-weight: bold;
    font-size: ${system.fontSizing.sm};
    color: ${system.color.lightgrey};
  }

  span {
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.sm};
  }
`
