import React, { Component } from 'react'
import Timekeeper from 'react-timekeeper'

class TimeKeeper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '12:00 pm',
      openTime: '',
      closeTime: ''
    }
  }

  //sets the chosen time on state and assigns it to openTime or closeTime depending on if this.props.name is 'open' or 'close'
  handleTimeChange = newTime => {
    this.setState({ time: newTime.formatted })
    if (this.props.name === 'close') {
      this.setState({ closeTime: this.state.time })
      console.log(`close time is ${this.state.closeTime}`)
    } else {
      this.setState({ openTime: this.state.time })
      console.log(`open time is ${this.state.openTime}`)
    }
  }

  render() {
    return (
      <div>
        <Timekeeper
          time={this.state.time}
          name={this.props.name}
          onChange={this.handleTimeChange}
          onDoneClick={() =>
            this.props.name === 'open'
              ? this.props.saveAndClose(this.state.openTime)
              : this.props.saveAndClose(this.state.closeTime)
          }
        />
      </div>
    )
  }
}

export default TimeKeeper
