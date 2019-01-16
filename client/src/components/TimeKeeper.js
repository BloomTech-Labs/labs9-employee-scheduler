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
  }

  saveTime = () => {
    if (this.props.name === close) {
      this.setState({ closeTime: this.state.time })
    }
    if (this.props.name === open) {
      this.setState({ openTime: this.state.time })
    }
  }

  render() {
    return (
      <div>
        <Timekeeper
          time={this.state.time}
          name={this.props.name}
          onChange={this.handleTimeChange}
          onDoneClick={() => this.props.saveAndClose(this.state.time)}
        />
      </div>
    )
  }
}
