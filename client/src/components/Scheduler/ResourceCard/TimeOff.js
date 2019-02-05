import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../../design/theme'
import CardContainer from '../../common/CardContainer'
import moment from 'moment'

// this component should render the employee's PTO. It will also display pending PTO so managers can approve or reject.

export const StatusContent = ({ id, status, handleTimeOff }) => {
  if (status === 'approved') {
    return (
      <Action id={id} name="deny" onClick={handleTimeOff} approve>
        &#x2714;
      </Action>
    )
  }
  if (status === 'pending') {
    return (
      <Div className="buttons">
        <Action id={id} name="approve" onClick={handleTimeOff} approve>
          &#x2714;
        </Action>
        <Action id={id} name="deny" onClick={handleTimeOff}>
          &#x2716;
        </Action>
      </Div>
    )
  }
  if (status === 'denied') {
    return (
      <Action id={id} name="approve" onClick={handleTimeOff}>
        &#x2716;
      </Action>
    )
  }

  return null
}

class TimeOff extends Component {
  render() {
    const { timeOffRequests } = this.props
    return (
      <CardContainer exists={timeOffRequests} id="timeOff">
        {/* Employee's Time Off */}
        {/* When this component is being rendered on the calendar page employee sidebar, it should show approved PTO
          When it's on the employees directory page, it should show pending PTO */}
        <Heading>Requested Time Off</Heading>
        {/* below, we want to check if the view is pool. If so, don't show denied requests. And get rid of the approve / deny buttons. There are props passed on PTO to enable styling */}
        {timeOffRequests &&
          timeOffRequests.map(({ id, start, status }) =>
            status === 'denied' ? null : (
              <PTO key={id} status={status}>
                <div className="text">
                  <p className="date">
                    {moment(start)
                      .local()
                      .format('MM / DD')}
                  </p>
                  <p className="status" status={status}>
                    {status}
                  </p>
                </div>
              </PTO>
            )
          )}
      </CardContainer>
    )
  }
}

export default TimeOff

TimeOff.propTypes = {
  timeOffRequests: propTypes.array
}

const Heading = styled.h6`
  text-align: start;
  @media ${system.breakpoints[1]} {
    text-align: center;
  }
`

const Div = styled.div`
  .buttons {
    display: flex;
    flex-flow: row nowrap;
  }
`

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

  .text {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    p {
      font-weight: bold;
      font-size: ${system.fontSizing.sm};
      color: ${system.color.bodytextl};

      &.date {
        white-space: nowrap;
      }
    }

    .status {
      color: ${props =>
        props.status === 'approved'
          ? system.color.success
          : props.status === 'denied'
          ? system.color.danger
          : props.status === 'pending'
          ? system.color.lightgrey
          : system.color.bodytext};
      font-size: ${system.fontSizing.sm};
      font-weight: 'bold';
      padding-left: 0.5rem;
    }
  }
`

const Action = styled.button`
  background: ${props =>
    props.approve ? system.color.success : system.color.danger};
  cursor: pointer;
  border-radius: ${system.borders.radius};
  border: ${system.borders.transparent};
  color: ${system.color.neutral};
  box-shadow: ${system.shadows.button};
  font-size: ${system.fontSizing.sm};
  transition: ${system.transition};
  outline: none;
  margin-right: 5px;
  :hover {
    box-shadow: ${system.shadows.other};
  }
`
