import React from 'react'
import propTypes from 'prop-types'
import { formatHours } from '../../utils'
import { Shifts } from './AssignedShifts'

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
const Availability = props => {
  const { availabilities } = props
  // the below should not render if there is no data being pass to it. This is not working though...
  return availabilities === []
    ? null
    : availabilities &&
        availabilities.map(({ id, day, start_time, end_time, off }) => (
          //temporarily adds ids tp the DOM for easy access for testing
          <Shifts key={id} data-testid="availability_day">
            <p>{weekdays[day]}</p>
            <span>
              {off
                ? 'unavailable'
                : `${formatHours(start_time)} - ${formatHours(end_time)}`}
            </span>
          </Shifts>
        ))
}

export default Availability

Availability.propTypes = {
  // adding propTypes here
  availabilities: propTypes.array
}
