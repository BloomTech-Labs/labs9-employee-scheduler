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
        <p>Name: {`${first_name} ${last_name}`}</p>

        {/* Employee Email */}
        <p>Email: {email}</p>

        {/* Employee Phone */}
        <p>Phone: {phone}</p>

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
  margin: ${system.spacing.standardPadding};
  width: 300px; // this is temp until we get a better system

  p {
    padding: ${system.spacing.standardPadding};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.m};
  }
`
