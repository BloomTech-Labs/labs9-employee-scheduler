import React, { Component } from 'react'
import propTypes from 'prop-types'
import DayPicker from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { formatDate, parseDate } from 'react-day-picker/moment'

class TimeOffRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDay: undefined
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    console.log(this.state.selectedDay)
    return (
      <div>
        <DayPicker
          formatDate={formatDate}
          parseDate={parseDate}
          placeholder={`${formatDate(new Date())}`}
          onClick={this.handleChange}
          // name={}
          // value{}
        />
      </div>
    )
  }
}

export default TimeOffRequest

TimeOffRequest.propTypes = {
  // adding propTypes here
}
