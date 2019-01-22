import React, { Component } from 'react'
import Form from '../Form/index'
import styled from '@emotion/styled'
import system from '../../design/theme'
import { connect } from 'react-redux'
import { getAvailability, editAvailability } from '../../actions'
import SelectList from '../common/SelectList'
import options from './AvailabilityOptions'

const user = '9474b689-ef77-47a1-ba20-b1bac12beeee'

class AvailabilityForm extends Component {
  constructor() {
    super()
    this.state = {
      availability: [],
      start_time: null,
      end_time: null,
      off: false
    }
  }

  componentDidMount() {
    this.setState({
      availability: this.props.getAvailability(user)
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  updateAvailability = () => {
    let newTime
    if (this.state.start_time === !null) {
      newTime = this.state.start_time
    }
    this.props.editAvailability(newTime)
  }

  render() {
    console.log(this.state.start_time)
    console.log(this.props.availability)

    return (
      <div>
        <h5>Edit Availability</h5>
        {this.props.availability.map(a => {
          return (
            <div key={a.id}>
              <Form.Group>
                <Form.Label>Day: {a.day}</Form.Label>
              </Form.Group>
              <SelectList
                label="start time"
                name="start_time"
                value={a.start_time}
                changeHandler={this.handleChange}
                options={options}
                ariaLabel="start time"
              />
              <SelectList
                label="end time"
                name="end_time"
                value={a.end_time}
                changeHandler={this.handleChange}
                options={options}
                ariaLabel="end time"
              />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    availability: state.availability.availability
  }
}

export default connect(
  mapStateToProps,
  { editAvailability, getAvailability }
)(AvailabilityForm)
