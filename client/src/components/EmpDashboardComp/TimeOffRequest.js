import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Form from '../Form/index'
import axios from 'axios'
import styled from '@emotion/styled'
import system from '../../design/theme'
import { connect } from 'react-redux'

import 'react-datepicker/dist/react-datepicker.css'

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

  //sends the date and time off request to the server
  submitTimeOffRequest = ({ reason }) => {
    //converts date to 'YYYY-MM-DD' format
    const convertDateToMoment = e => {
      let dateString = this.state.startDate
      let dateObj = new Date(dateString)
      let momentObj = moment(dateObj)
      let momentString = momentObj.format('YYYY-MM-DD')
      return momentString
    }

    const { token, user } = this.props.auth
    const date = convertDateToMoment()
    // const date = this.state.startDate
    axios
      .post(
        `${api}/time-off-requests/${user.id}`,
        { date, reason },
        {
          headers: { authorization: token }
        }
      )
      .then(() => this.setState({ message: 'request received' }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Container>
        <h5>Request time off</h5>
        <Form
          initialValues={{
            reason: ''
          }}
          onSubmit={this.submitTimeOffRequest}
        >
          <Form.Label>Date</Form.Label>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
          <Form.Group property="reason" type="text">
            <Form.Label>Reason</Form.Label>
            <Form.TextInput className="reason" />
            <Form.SubmitButton type="submit">Submit</Form.SubmitButton>
          </Form.Group>
        </Form>
        <p>{this.state.message}</p>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {}
)(TimeOffRequest)

TimeOffRequest.propTypes = {
  // adding propTypes here
}

const Container = styled('div')`
  padding: ${system.spacing.bigPadding};
  box-shadow: ${system.shadows.otherLight};
  width: 100%;
  max-width: 30 0px;
  min-width: 200px;
  border-radius: ${system.borders.radius};

  width: 100%;
  h5 {
    font-size: ${system.fontSizing.ml};
  }
  p {
    font-size: ${system.fontSizing.m};
  }
`
