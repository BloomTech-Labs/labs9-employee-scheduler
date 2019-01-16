import React, { Component } from 'react'
import Timekeeper from 'react-timekeeper'

export default class componentName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '12:00 pm'
    }
  }
  render() {
    return (
      <div>
        <Timekeeper
          time={this.state.time}
          name={this.props.name}
          onDoneClick={() => this.props.saveAndClose()}
        />
      </div>
    )
  }
}
