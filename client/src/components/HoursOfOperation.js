import React, { Component } from 'react'
import Timekeeper from './TimeKeeper'
import styled from '@emotion/styled'
import system from '../design/theme'

export const Button = ({ handleHours, id }) => {
  return (
    <div>
      <button id={id} onClick={handleHours} name="open">
        open
      </button>
      <button id={id} onClick={handleHours} name="close">
        close
      </button>
    </div>
  )
}

class HoursOfOperation extends Component {
  constructor() {
    super()
    this.state = {
      time: '12:00 pm',
      isOpen: false,
      isClose: false
    }
  }

  handleTimeChange = newTime => {
    this.setState({ time: newTime.formatted })
  }

  handleHours = e => {
    console.log(e.target.name)
    if (e.target.name === 'open') {
      this.setState({ isOpen: true, isClose: false })
    } else {
      this.setState({ isOpen: false, isClose: true })
    }
  }

  saveAndClose = () => {
    //TODO: will need to send the changed time to the DB here
    this.setState({ isOpen: false, isClose: false })
  }

  render() {
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday'
    ]
    return (
      <Container>
        <HoursContainer>
          {days.map((button, i) => {
            return (
              <div key={i}>
                <p>{days[i]}</p>
                <Button handleHours={this.handleHours}>{button.open}</Button>
              </div>
            )
          })}
        </HoursContainer>
        {this.state.isOpen === true ? (
          <Timekeeper name="open" saveAndClose={this.saveAndClose} />
        ) : this.state.isClose === true ? (
          <Timekeeper name="close" saveAndClose={this.saveAndClose} />
        ) : null}
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
  max-width: 500px;
`
