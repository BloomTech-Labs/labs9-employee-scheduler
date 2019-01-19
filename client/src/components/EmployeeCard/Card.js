import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'

import Availability from './Availability'
import TimeOff from './TimeOff'

// this card component will contain the employee's info such as name, email, phone.
// these cards will live in both the calendar page (view only) and the employees directory (edit possible)
class Card extends Component {
  render() {
    const {
      first_name,
      last_name,
      email,
      phone,
      availabilities,
      time_off_requests
    } = this.props

    return (
      <Container>
        {/* Employee Name */}
        <P main>{`${first_name} ${last_name}`}</P>

        {/* Employee Email */}
        <P>{email}</P>

        {/* Employee Phone */}
        <P>{phone}</P>

        <div>
          <Availability availabilities={availabilities} />
          <TimeOff timeOffRequests={time_off_requests} />
        </div>
      </Container>
    )
  }
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
  margin: ${system.spacing.bigPadding};
  border-radius: ${system.borders.bigRadius};
  width: 300px;
  box-shadow: ${system.shadows.otherLight};
  /* // this width is temp until we get a better system */
`

const P = styled.p`
  padding: 2.5px 7.5px;
  font-family: ${props => (props.main ? "'Lato', sans-serif" : 'inherit')};
  font-weight: ${props => (props.main ? 'bold' : null)};
  color: ${props =>
    props.main ? system.color.primary : system.color.captiontext};
  font-size: ${props =>
    props.main ? system.fontSizing.m : system.fontSizing.sm};
  line-height: ${system.spacing.lineHeight};
`
