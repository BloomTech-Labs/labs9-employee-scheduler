import React, { Component } from 'react'
import Timekeeper from './HoursOfOperationModal/TimeKeeper'
import Button from './HoursOfOperationModal/Button'
import styled from '@emotion/styled'
import system from '../design/theme'
//creates a dynamic button generator

class HoursOfOperation extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
      isClose: false,
      time: ''
    }
  }
  //opens the correct version of the timekeeper so it sends back
  //either open time or close time
  handleHours = e => {
    if (e.target.name === 'open') {
      this.setState({ isOpen: true, isClose: false })
    } else {
      this.setState({ isOpen: false, isClose: true })
    }
  }

  //closes the time keeper and sets the time on state that we want to send back to the DB
  saveAndClose = (e, time) => {
    //TODO: will need to send the changed time to the DB here

    this.setState({ isOpen: false, isClose: false, time: time })
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
        <h1>Hours of Operation</h1>
        <HoursContainer>
          {/* maps over the days and places a pair of edit buttons for each one */}
          {days.map((button, i) => {
            return (
              <div key={i}>
                <p>{days[i]}</p>
                <Button handleHours={this.handleHours}>{button}</Button>
              </div>
            )
          })}
        </HoursContainer>

        {/* opens either a diffeernce instance of the timekeeper based on if it's editing open or close time */}
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

const HoursContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
