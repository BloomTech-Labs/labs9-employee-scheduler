import React, { Component } from 'react'
import propTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Form from '../Form/index'
import axios from 'axios'

import 'react-datepicker/dist/react-datepicker.css'
import { fromParams } from 'google-gax/build/src/routing_header'

class TimeOffRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      requestDate: '',
      reason: ''
    }
  }

  handleChange = date => {
    this.setState({
      startDate: date
    })
  }

  convertDate = () => {
    let dateString = this.state.startDate
    let dateObj = new Date(dateString)
    let momentObj = moment(dateObj)
    let momentString = momentObj.format('YYYY-MM-DD')
    this.setState({ requestDate: momentString })
  }

  submitTimeOffRequest = e => {
    e.preventDefault()
    const { requestDate, reason } = this.state
    axios
      .post('https://cadence-api.herokuapp.com/time-off-requests', {
        requestDate,
        reason
      })
      .then()
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state.request)
    return (
      <form>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
        <Form.Label>Reason</Form.Label>
        <Form.TextInput />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default TimeOffRequest

TimeOffRequest.propTypes = {
  // adding propTypes here
}
