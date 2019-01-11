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
    const { first_name, last_name, email, phone } = this.props

    return (
      <Container>
        {/* Employee Name */}
        <p>
          <B>Name:</B>
          <br /> {`${first_name} ${last_name}`}
        </p>

        {/* Employee Email */}
        <p>
          <B>Email:</B>
          <br /> {email}
        </p>

        {/* Employee Phone */}
        <p>
          <B>Phone:</B>
          <br /> {phone}
        </p>

        <Availability />
        <TimeOff />
      </Container>
    )
  }
}

export default Card

Card.propTypes = {
  // adding propTypes here
}

const Container = styled('div')`
  background: ${system.color.white};
  padding: ${system.spacing.standardPadding};
  margin: ${system.spacing.bigPadding};
  border-radius: ${system.borders.bigRadius};
  width: 300px;
  box-shadow: ${system.shadows.otherLight};
  /* // this width is temp until we get a better system */

  p {
    padding: ${system.spacing.standardPadding};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.m};
    line-height: ${system.spacing.lineHeight};
  }
`

const B = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  font-size: ${system.fontSizing.s};
`
