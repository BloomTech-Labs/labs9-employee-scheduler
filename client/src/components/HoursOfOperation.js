import React, { Component } from 'react'
import Timekeeper from 'react-timekeeper'
import styled from '@emotion/styled'
import system from '../design/theme'

class HoursOfOperation extends Component {
  constructor() {
    super()
    this.state = {
      time: '12:00 pm',
      isOpen: false
    }
  }

  handleTimeChange = newTime => {
    this.setState({ time: newTime.formatted })
  }
  render() {
    return (
      <Container>
        <HoursContainer>
          <P>Sunday</P>
          <button>open</button>
          <button>close</button>
          <P>Monday</P>
          <button>open</button>
          <button>close</button>
          <P>Tuesday</P>
          <button>open</button>
          <button>close</button>
          <P>Wednesday</P>
          <button>open</button>
          <button>close</button>
          <P>Thursday</P>
          <button>open</button>
          <button>close</button>
          <P>Friday</P>
          <button>open</button>
          <button>close</button>
          <P>Saturday</P>
          <button>open</button>
          <button>close</button>
        </HoursContainer>
        this.state.isOpen ?
        <React.Fragment>
          <Timekeeper time={this.state.time} onChange={this.handleTimeChange} />
        </React.Fragment>
      </Container>
    )
  }
}

export default HoursOfOperation

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

const HoursContainer = styled.div``

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
