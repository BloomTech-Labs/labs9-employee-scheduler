import React from 'react'
import moment from 'moment'
import system from '../../design/theme'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const TimeOffApproved = ({
  id,
  status,
  start,
  reason,
  deleteExpiredRequest
}) => {
  return (
    <PTO key={id} status={status}>
      <div className="text">
        <p>
          {moment(start)
            .local()
            .format('MM / DD')}
        </p>
        <p className="status" status={status}>
          {status}
        </p>
      </div>
      <p className="reason">{reason}</p>
      <i className="fas fa-backspace" onClick={deleteExpiredRequest} />
    </PTO>
  )
}

export default TimeOffApproved

TimeOffApproved.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  deleteExpiredRequiest: PropTypes.func
}

const PTO = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${system.color.neutral};

  :last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateX(0);
    }
    40% {
      transform: translateX(10px);
    }
    60% {
      transform: translateX(5px);
    }
  }

  .reason {
    width: 60%;
    text-align: left;
    @media ${system.breakpoints[0]} {
      width: 50%;
      font-size: ${system.fontSizing.s};
    }
  }

  i {
    cursor: pointer;
    color: ${system.color.danger};
    font-size: ${system.fontSizing.m};
    transition: 0.5ms ease-in-out;
    &:hover {
      color: rgb(255, 100, 100);
      animation: bounce 0.5s linear infinite;
    }
  }

  .text {
    display: flex;
    flex-flow: ${props => (props.pool ? 'row nowrap' : 'column nowrap')};
    align-items: ${props => (props.pool ? 'center' : null)};
    justify-content: ${props => (props.pool ? 'space-between' : null)};
    width: ${props => (props.pool ? '100%' : null)};

    p {
      font-weight: bold;
      font-size: ${system.fontSizing.sm};
      color: ${props =>
        props.pool ? system.color.bodytext : system.color.lightgrey};
    }

    .status {
      text-align: left;
      color: ${props =>
        props.status === 'approved'
          ? system.color.success
          : props.status === 'denied'
          ? system.color.danger
          : system.color.bodytext};
      font-size: ${props =>
        props.pool ? system.fontSizing.sm : system.fontSizing.s};
      font-weight: ${props => (props.pool ? 'bold' : 'normal')};
    }
  }
`
