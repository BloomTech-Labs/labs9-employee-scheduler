import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../../design/theme'
import Availability from './Availability'
import TimeOff from './TimeOff'

// this card component will contain the employee's info such as name, email, phone.
// these cards will live in both the calendar page (view only) and the employees directory (edit possible)
const Card = ({
  first_name,
  last_name,
  availabilities,
  time_off_requests,
  view
}) => {
  return (
    <Container id="employeePool">
      <div className="x" />
      {/* Employee Name */}
      <P main>{`${first_name} ${last_name}`}</P>
      <div>
        {/* the below two things should conditionally render based on whether there is data or not */}
        {availabilities && availabilities.length ? (
          <Availability availabilities={availabilities} />
        ) : null}

        {time_off_requests && time_off_requests.length ? (
          <TimeOff timeOffRequests={time_off_requests} view={view} />
        ) : null}
      </div>
    </Container>
  )
}

export default Card

Card.propTypes = {
  // adding propTypes here
  first_name: propTypes.string,
  last_name: propTypes.string,
  email: propTypes.string,
  phone: propTypes.string,
  availabilities: propTypes.array,
  time_off_requests: propTypes.array
}

const Container = styled('div')`
  background: ${system.color.white};
  padding: ${system.spacing.standardPadding};
  margin: 12.5px 0;
  border-radius: ${system.borders.bigRadius};
  width: 300px;
  box-shadow: ${system.shadows.otherLight};

  @media ${system.breakpoints[1]} {
    width: 220px;
  }
`
/* // this width is temp until we get a better system */

const P = styled.p`
  padding: 2.5px 7.5px;
  font-family: ${props => (props.main ? "'Lato', sans-serif" : 'inherit')};
  font-weight: ${props => (props.main ? 'bold' : null)};
  color: ${props =>
    props.main ? system.color.primary : system.color.captiontext};
  font-size: ${props =>
    props.main ? system.fontSizing.m : system.fontSizing.sm};
  line-height: ${system.spacing.lineHeight};
  text-align: start;
  @media ${system.breakpoints[1]} {
    text-align: center;
  }

  span {
    font-size: ${system.fontSizing.s};
    color: ${system.color.bodytext};
    font-weight: bold;
  }
`
