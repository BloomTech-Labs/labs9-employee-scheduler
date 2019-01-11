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
        <P main>{`${first_name} ${last_name}`}</P>

        {/* Employee Email */}
        <P>{email}</P>

        {/* Employee Phone */}
        <P>{phone}</P>

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
