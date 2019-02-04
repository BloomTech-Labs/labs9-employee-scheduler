import React, { Component } from 'react'
// import DatePicker from 'react-datepicker'
import moment from 'moment'
import { connect } from 'react-redux'
import { addTimeOffRequest } from '../../actions'
import PropTypes from 'prop-types'
import { Form, Input } from '../common/FormContainer'
import Button from '../common/Button'

class TimeOffRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestDate: '',
      reason: ''
    }
  }

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
    const start = date.startOf('day')
    const end = date.endOf('day')
    const now = moment()

    if (date._d < now._d) {
      alert(`You can't go on vacation in the past, silly!`)
    } else {
      const { token, user } = this.props.auth
      const formattedDate = date.format('YYYY-MM-DD')
      this.props.addTimeOffRequest(user.id, start, end, reason, token)
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

TimeOffRequest.propTypes = {
  addTimeOffRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  changeHandler: PropTypes.func,
  value: PropTypes.string,
  submitTimeOffRequest: PropTypes.func
}
