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
      time: '',
      show: false,
      days: {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
      }
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

  showHandleHours = e => {
    e.preventDefault()
    console.log(e.target.name)
    const { days } = this.state
    this.setState({
      days: {
        ...days,
        [e.target.name]: !days[e.target.name]
      }
    })
  }

  //closes the time keeper and sets the time on state that we want to send back to the DB
  saveAndClose = (e, time) => {
    //TODO: will need to send the changed time to the DB here

    this.setState({ isOpen: false, isClose: false, time: time })
  }

  render() {
    return (
      <Container>
        <div className="days-container">
          <h3>Hours of Operation</h3>
          <HoursContainer>
            {/* maps over the days and places a pair of edit buttons for each one */}
            {Object.keys(this.state.days).map((day, i) => {
              return (
                <Button
                  key={i}
                  handleHours={this.handleHours}
                  day={this.state.days[day]}
                  name={day}
                  showHandleHours={this.showHandleHours}
                >
                  {this.props.children}
                </Button>
              )
            })}
          </HoursContainer>
        </div>

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

const HoursContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  .days-container {
    display: flex;
    flex-direction: column;
    padding: ${system.spacing.bigPadding};
    height: 100%;
    width: 159px;
    border: 1px solid black;
    margin: 0 auto;
    h3 {
      font-size: ${system.fontSizing.s};
      margin: bottom;
    }
  }
`
