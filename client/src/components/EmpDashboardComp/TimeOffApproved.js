import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'

const TimeOffApproved = ({ user }) => {
  return (
    <TimeOffContainer>
      {user.map(item => {
        return (
          <div key={item.id} className="title">
            <h5>Time Off Approved</h5>
            {item.timeOffApproved.map(tOA => {
              return (
                <div className="details" key={tOA.id}>
                  <div>
                    <p>{tOA.date}</p>
                    //button will be for employees to remove a time off request.
                    This will //be easier to work with when we have an id for an
                    employee showing on //the employee page.
                    <button>remove request</button>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </TimeOffContainer>
  )
}

export default TimeOffApproved

TimeOffApproved.propTypes = {
  // adding propTypes here
}

const TimeOffContainer = styled('div')`
  padding: ${system.spacing.bigPadding};
  box-shadow: ${system.shadows.otherLight};
  width: 100%;
  max-width: 30 0px;
  min-width: 200px;
  border-radius: ${system.borders.radius};
  .title {
    width: 100%;
    h5 {
      font-size: ${system.fontSizing.ml};
    }
    .details {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      margin: 33px auto;
      p {
        font-size: ${system.fontSizing.m};
      }
    }
  }
`
