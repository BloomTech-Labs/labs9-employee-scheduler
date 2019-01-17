import React, { Component } from 'react'
import Timekeeper from 'react-timekeeper'

export default class componentName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '12:00 pm',
      openTime: '',
      closeTime: ''
    }
  }

  handleTimeChange = newTime => {
    this.setState({ time: newTime.formatted })
    const openTime = this.state.openTime
    const closeTime = this.state.closeTime
    if (this.props.name === 'close') {
      this.setState({ closeTime: this.state.time })
      return closeTime
    } else {
      this.setState({ openTime: this.state.time })
      return openTime
    }
  }

  helper = () => {
    this.handleTimeChange()
    this.saveTime()
  }

  render() {
    console.log('open', this.state.openTime)
    console.log('close', this.state.closeTime)

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
