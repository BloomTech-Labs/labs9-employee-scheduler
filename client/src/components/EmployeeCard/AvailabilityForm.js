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
      end_time: null
    }
  }

  componentDidMount() {
    this.setState({
      availability: this.props.getAvailability(user)
    })
    console.log()
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state)
  }

  render() {
    console.log(this.state.start_time)
    console.log(this.props.getAvailability())

    return (
      <div>
        <h5>Edit Availability</h5>
        {this.props.availability.map(a => {
          return (
            <div key={a.id}>
              <Form.Group>
                <Form.Label>{a.day}</Form.Label>
              </Form.Group>
              <SelectList
                label="start time"
                name="start_time"
                value={a.start_time}
                changeHandler={this.handleChange}
                options={options}
                ariaLabel="start time"
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
    // getAvailability: state.availability
  }
}

export default connect(
  mapStateToProps,
  { editAvailability, getAvailability }
)(AvailabilityForm)
