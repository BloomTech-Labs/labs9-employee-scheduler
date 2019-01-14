import React, { Component } from 'react'
import propTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Form from '../Form/index'
import axios from 'axios'

import 'react-datepicker/dist/react-datepicker.css'
import { fromParams } from 'google-gax/build/src/routing_header'
const api = process.env.REACT_APP_SERVER_URL

const user = '77b6afd5-38cb-4304-9c0f-bb55ac496342'
class TimeOffRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      requestDate: '',
      reason: '',
      message: ''
    }
  }
  //this comes directly from the datePicker docs, I think 'date' is happening under the hood.
  handleChange = date => {
    this.setState({
      startDate: date
    })
  }

  convertDateToMoment = e => {
    let dateString = this.state.startDate
    let dateObj = new Date(dateString)
    let momentObj = moment(dateObj)
    let momentString = momentObj.format('YYYY-MM-DD')
    return momentString
  }

  submitTimeOffRequest = ({ reason }) => {
    const date = this.convertDateToMoment()
    const requestObj = { date, reason }
    console.log(requestObj)
    axios
      .post(`${api}/time-off-requests/${user}`, requestObj, {
        headers: { authorization: 'testing' }
      })
      .then(() => this.setState({ message: 'request received' }))
      .catch(err => console.log(err))
  }

  render() {
    console.log('start date', this.state.startDate)
    console.log('converted', this.convertDateToMoment)
    console.log('after submit', this.state.requestDate)
    return (
      <div>
        <Form
          initialValues={{
            reason: ''
          }}
          onSubmit={this.submitTimeOffRequest}
        >
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
          <Form.Group property="reason" type="text">
            <Form.Label>Reason</Form.Label>
            <Form.TextInput />
            <Form.SubmitButton type="submit">Submit</Form.SubmitButton>
          </Form.Group>
        </Form>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

export default TimeOffRequest

TimeOffRequest.propTypes = {
  // adding propTypes here
}
