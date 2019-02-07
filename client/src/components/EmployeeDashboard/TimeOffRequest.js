import React, { Component } from 'react'
// import DatePicker from 'react-datepicker'
import moment from 'moment'
import { connect } from 'react-redux'
import { addTimeOffRequest } from '../../actions'
import PropTypes from 'prop-types'
import { Form, Input } from '../common/FormContainer'
import Button from '../common/Button'
import styled from '@emotion/styled'
import system from '../../design/theme'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

class TimeOffRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestDate: '',
      reason: ''
    }
  }
  handleDayClick = day => {
    this.setState({ requestDate: day })
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
      this.props.addTimeOffRequest(user.id, start, end, reason, token)
      event.target.reset()
    }
  }

  render() {
    return (
      <Form onSubmit={this.submitTimeOffRequest}>
        <TimeOffContainer>
          <div>
            {/* <label>PTO Date</label> */}
            <DatePicker>
              <label>Select a day</label>
              <DayPicker onDayClick={this.handleDayClick} />
              {this.state.requestDate ? (
                <label>
                  Selected: {this.state.requestDate.toLocaleDateString()}
                </label>
              ) : (
                <label />
              )}
            </DatePicker>
          </div>
          {/* <Input
          type="date"
          name="requestDate"
          value={this.props.value}
          onChange={this.changeHandler}
        /> */}
          <ReasonContainer>
            <label htmlFor="reason">Reason</label>
            <Input
              type="text"
              name="reason"
              placeholder="ex. Doctor's Appt."
              onChange={this.changeHandler}
              value={this.props.value}
              aria-label="text"
              required
            />
            <Button type="submit" data-test="submit">
              Submit
            </Button>
          </ReasonContainer>
        </TimeOffContainer>
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

const DatePicker = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`
const TimeOffContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media ${system.breakpoints[1]} {
    flex-direction: column;
  }

  @media ${system.breakpoints[1]} {
    padding: 10px 0 0;
  }
`
const ReasonContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`
