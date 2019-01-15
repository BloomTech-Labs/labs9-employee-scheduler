import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'
import CardContainer from '../common/CardContainer'
import Axios from 'axios'

// this component should render the employee's PTO. It will also display pending PTO so managers can approve or reject.
const baseURL = process.env.REACT_APP_SERVER_URL
class TimeOff extends Component {
  dispoTimeOffRequests = e => {
    e.preventDefault()
    const id = e.target.id
    let response = ''
    let name = e.target.name
    if (name === 'deny') {
      response = 'denied'
    } else {
      response = 'approved'
    }

    Axios.put(
      `${baseURL}/time-off-requests/${id}`,
      { status: response },
      {
        headers: { authorization: 'testing' }
      }
    )
      .then(res => {
        console.log(res.data)
      })
      .catch(error => console.log(error))
  }

  render() {
    const { timeOffRequests } = this.props

    return (
      <CardContainer>
        {/* Employee's Time Off */}
        {/* When this component is being rendered on the calendar page employee sidebar, it should show approved PTO
        When it's on the employees directory page, it should show pending PTO */}
        <p>Requested Time Off</p>
        {timeOffRequests &&
          timeOffRequests.map(({ id, date, status }) => (
            <React.Fragment key={id}>
              <p>{`${date} ${status}`}</p>
              {status === 'confirmed' ? (
                <button id={id} name="deny" onClick={this.dispoTimeOffRequests}>
                  deny
                </button>
              ) : (
                <>
                  <button
                    id={id}
                    name="deny"
                    onClick={() => this.dispoTimeOffRequests}
                  >
                    deny
                  </button>
                  <button
                    id={id}
                    name="approve"
                    onClick={() => this.dispoTimeOffRequests}
                  >
                    approve
                  </button>
                </>
              )}
            </React.Fragment>
          ))}
      </CardContainer>
    )
  }
}

export default TimeOff

TimeOff.propTypes = {
  // adding propTypes here
}
