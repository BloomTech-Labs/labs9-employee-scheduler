import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'
import CardContainer from '../common/CardContainer'
import { formatHours, utcDayToLocal } from '../../utils'

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
class Availability extends Component {
  render() {
    const { availabilities } = this.props
    // the below should not render if there is no data being pass to it. This is not working though...
    return availabilities === [] ? null : (
      <CardContainer avail id="avails">
        {/* display the employee's weekly availability (e.g. Mon, weds. 8am to 5pm)
           in the employees directory, the supervisor should be able to select days and use a timepicker to alter this. */}
        <h6>Employee Availability</h6>
        {availabilities &&
          availabilities
            // only displays the days the employee is available
            .map(({ id, day, start_time, end_time, off }) => (
              //temporarily adds ids tp the DOM for easy access for testing
              <Avails key={id}>
                <p>{weekdays[utcDayToLocal({ day, time: start_time })]}</p>
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
}

export default Availability

Availability.propTypes = {
  // adding propTypes here
  availabilities: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  )
}

const Avails = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
  padding-bottom: 5px;
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
    font-size: ${system.fontSizing.s};
  }
`
