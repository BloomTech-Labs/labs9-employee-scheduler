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
  max-width: 216px;
  min-width: 200px;
  border-radius: ${system.borders.radius};
  .title {
    width; 100%;
    max-width: 200px;
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
