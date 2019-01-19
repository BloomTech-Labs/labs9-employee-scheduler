import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'
import CardContainer from '../common/CardContainer'
import { dispoTimeOffRequests } from '../../actions'
import { connect } from 'react-redux'

// this component should render the employee's PTO. It will also display pending PTO so managers can approve or reject.
const baseURL = process.env.REACT_APP_SERVER_URL

export const StatusContent = ({ id, status, handleTimeOff }) => {
  if (status === 'approved') {
    return (
      <Action id={id} name="deny" onClick={handleTimeOff}>
        &#x2716;
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
      <Action id={id} name="approve" onClick={handleTimeOff} approve>
        &#x2714;
      </Action>
    )
  }

  return null
}

class TimeOff extends Component {
  //sets the correct button on the DOM depending on the status of the request
  handleTimeOff = e => {
    e.preventDefault()
    const id = e.target.id
    let response = ''
    let name = e.target.name
    if (name === 'deny') {
      response = 'denied'
    } else {
      response = 'approved'
    }
    //calls function from redux actions
    this.props.dispoTimeOffRequests(id, response)
  }

  render() {
    const { timeOffRequests } = this.props

    if (timeOffRequests === []) {
      return null // for some reason this is not working... we want to be able to hide the entire container if there are no requests
    } else {
      return (
        <CardContainer>
          {/* Employee's Time Off */}
          {/* When this component is being rendered on the calendar page employee sidebar, it should show approved PTO
          When it's on the employees directory page, it should show pending PTO */}
          <h6>Requested Time Off</h6>
          {timeOffRequests &&
            timeOffRequests.map(({ id, date, status }) => (
              <PTO key={id}>
                <div className="text">
                  <p>
                    {/* Reformatting the date below */}
                    {date
                      .split('-')
                      .slice(1, 3)
                      .join('/')}
                  </p>
                  <span status={status}>{status}</span>
                </div>
                <StatusContent
                  id={id}
                  status={status}
                  handleTimeOff={this.handleTimeOff}
                />
              </PTO>
            ))}
        </CardContainer>
      )
    }
  }
}

export default connect(
  null,
  { dispoTimeOffRequests }
)(TimeOff)

TimeOff.propTypes = {
  timeOffRequests: propTypes.array
}

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
    flex-flow: column nowrap;

    p {
      font-weight: bold;
      font-size: ${system.fontSizing.sm};
      color: ${system.color.lightgrey};
    }

    /* We should be able to change this span color based on the status being passed to it */
    span {
      color: ${system.color.bodytext};
      font-size: ${system.fontSizing.s};
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
