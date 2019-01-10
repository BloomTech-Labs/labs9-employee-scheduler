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
    return (
      <Container>
        {/* Employee Name */}
        <p>Name:</p>

        {/* Employee Email */}
        <p>Email:</p>

        {/* Employee Phone */}
        <p>Phone:</p>

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
  border: 1px solid grey;
  padding: ${system.spacing.standardPadding};

  p {
    padding: ${system.spacing.standardPadding};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.m};
  }
`
