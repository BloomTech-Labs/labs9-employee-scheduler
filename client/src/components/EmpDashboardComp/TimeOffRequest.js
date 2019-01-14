import React, { Component } from 'react'
import propTypes from 'prop-types'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

class TimeOffRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date()
    }
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  render() {
    console.log(this.state.startDate)
    return (
      <div>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default TimeOffRequest

TimeOffRequest.propTypes = {
  // adding propTypes here
}
