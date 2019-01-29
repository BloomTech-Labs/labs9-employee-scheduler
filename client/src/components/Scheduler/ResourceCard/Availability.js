import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../../design/theme'

import { formatHours } from '../../../utils'
import CardContainer from '../../common/CardContainer'

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

// this component should render the employee's weekly availability. It, in the future, will also have the ability to turn into a form to update such info.
const Availability = ({ availabilities }) => {
  // the below should not render if there is no data being pass to it. This is not working though...
  return availabilities === [] ? null : (
    <CardContainer avail>
      {/* display the employee's weekly availability (e.g. Mon, weds. 8am to 5pm)
           in the employees directory, the supervisor should be able to select days and use a timepicker to alter this. */}
      <Heading>Employee Availability</Heading>
      {availabilities &&
        availabilities
          // only displays the days the employee is available
          .map(({ id, day, start_time, end_time, off }) => (
            //temporarily adds ids tp the DOM for easy access for testing
            <Avails key={id}>
              <p>{weekdays[day]}</p>
              <span>
                {off
                  ? 'unavailable'
                  : `${formatHours(start_time)} - ${formatHours(end_time)}`}
              </span>
            </Avails>
          ))}
    </CardContainer>
  )
}

export default Availability

Availability.propTypes = {
  // adding propTypes here
  availabilities: propTypes.array
}

const Heading = styled.h6`
  text-align: start;
  @media ${system.breakpoints[1]} {
    text-align: center;
  }
`

const Avails = styled.div`
  display: flex;
  flex-flow: row nowrap;
  @media ${system.breakpoints[1]} {
    flex-flow: column;
  }
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
  padding-bottom: 5px;
  @media ${system.breakpoints[1]} {
    padding-bottom: 15px;
  }
  border-bottom: 1px solid ${system.color.neutral};

  :last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  p.emphasis {
    font-weight: bold;
    font-size: ${system.fontSizing.sm};
    color: ${system.color.lightgrey};
  }

  /* We should be able to change this span color based on the status being passed to it */
  p {
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.s};
    display: inline;
    @media ${system.breakpoints[1]} {
      display: block;
    }
  }
`
