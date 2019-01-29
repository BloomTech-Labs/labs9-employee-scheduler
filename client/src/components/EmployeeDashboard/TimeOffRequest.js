import React, { Component } from 'react'
// import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'
import styled from '@emotion/styled'
import system from '../../design/theme'
import { connect } from 'react-redux'
import { addTimeOffRequest } from '../../actions'

import { Form, Input } from '../common/FormContainer'
import Button from '../common/Button'

// import 'react-datepicker/dist/react-datepicker.css'

const api = process.env.REACT_APP_SERVER_URL

// const user = '77b6afd5-38cb-4304-9c0f-bb55ac496342'
class TimeOffRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestDate: '',
      reason: ''
    }
  }
  // //this comes directly from the datePicker docs, I think 'date' is happening under the hood.
  // handleChange = date => {
  //   this.setState({
  //     startDate: date
  //   })
  // }

  changeHandler = event => {
    event.preventDefault()
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  //sends the date and time off request to the server
  submitTimeOffRequest = event => {
    //converts date to 'YYYY-MM-DD' format
    event.preventDefault()

    const { requestDate, reason } = this.state

    const date = moment(requestDate)
    const now = moment()

    if (date._d < now._d) {
      alert(`You can't go on vacation in the past, silly!`)
    } else {
      const { token, user } = this.props.auth
      const formattedDate = date.format('YYYY-MM-DD')
      this.props.addTimeOffRequest(user.id, formattedDate, reason, token)
      alert(
        `We put in your PTO request for ${formattedDate}. We hope you get it!`
      )
      event.target.reset()
    }
  }

  render() {
    return (
      <Form onSubmit={this.submitTimeOffRequest}>
        <label>PTO Date</label>
        <Input
          type="date"
          name="requestDate"
          value={this.props.value}
          onChange={this.changeHandler}
        />

        <label htmlFor="reason">Reason</label>
        <Input
          type="text"
          name="reason"
          placeholder="ex. Doctor's Appt."
          onChange={this.changeHandler}
          value={this.props.value}
          aria-label="text"
        />
        <Button type="submit" data-test="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { addTimeOffRequest }
)(TimeOffRequest)

// TimeOffRequest.propTypes = {
// adding propTypes here
// }
