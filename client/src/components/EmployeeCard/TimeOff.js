import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'
import CardContainer from '../common/CardContainer'
import { dispoTimeOffRequests } from '../../actions'
import { connect } from 'react-redux'
import moment from 'moment'

// this component should render the employee's PTO. It will also display pending PTO so managers can approve or reject.
const baseURL = process.env.REACT_APP_SERVER_URL

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
    this.props.dispoTimeOffRequests(id, response, this.props.token)
  }

  render() {
    const { timeOffRequests } = this.props
    return (
      <CardContainer PTO>
        {/* Employee's Time Off */}
        {/* When this component is being rendered on the calendar page employee sidebar, it should show approved PTO
          When it's on the employees directory page, it should show pending PTO */}
        <h6>Requested Time Off</h6>
        {/* below, we want to check if the view is pool. If so, don't show denied requests. And get rid of the approve / deny buttons. There are props passed on PTO to enable styling */}
        {timeOffRequests &&
          timeOffRequests.map(({ id, date, status }) =>
            this.props.view === 'pool' && status === 'denied' ? null : (
              <PTO
                key={id}
                pool={this.props.view === 'pool' ? true : false}
                status={status}
              >
                <div className="text">
                  <p>{moment(date).format('MM / DD')}</p>
                  <p className="status" status={status}>
                    {status}
                  </p>
                </div>
                {this.props.view === 'pool' ? null : (
                  <StatusContent
                    id={id}
                    status={status}
                    handleTimeOff={this.handleTimeOff}
                  />
                )}
              </PTO>
            )
          )}
      </CardContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

export default connect(
  mapStateToProps,
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
      color: ${props =>
        props.status === 'approved'
          ? system.color.success
          : props.status === 'denied'
          ? system.color.danger
          : props.pool && props.status === 'pending'
          ? system.color.lightgrey
          : system.color.bodytext};
      font-size: ${props =>
        props.pool ? system.fontSizing.sm : system.fontSizing.s};
      font-weight: ${props => (props.pool ? 'bold' : 'normal')};
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
