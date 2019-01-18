import React, { Component } from 'react'
import Timekeeper from 'react-timekeeper'
import moment from 'moment'

class TimeKeeper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '12:00 pm',
      openTime: null,
      closeTime: null
    }
  }

  //sets the chosen time on state and assigns it to openTime or closeTime depending on if this.props.name is 'open' or 'close'
  handleTimeChange = newTime => {
    const convert = num => {
      const newTime = num.split(':').map(num => parseInt(num))
      const result = newTime[0] + newTime[1] / 100
      return result
    }

    let myNewTime = moment(this.state.time, ['h:mm A']).format('HH:mm')

    let convertedTime = convert(myNewTime)

    this.setState({ time: newTime.formatted })
    if (this.props.name === 'close') {
      this.setState({ closeTime: this.state.closeTime })
    } else {
      this.setState({ openTime: this.state.time })
    }
  }

  render() {
    // console.log(this.state.time)
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
