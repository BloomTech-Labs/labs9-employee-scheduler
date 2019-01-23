import React, { Component } from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'
import { connect } from 'react-redux'
import { getAvailability, editAvailability } from '../../actions'
import Button from '../common/Button'
import Availability from './AvailabilitySelect'

const user = '9474b689-ef77-47a1-ba20-b1bac12beeee'
class AvailabilityForm extends Component {
  constructor() {
    super()
    this.state = {
      availability: [],
      days: [
        {
          name: 'sunday',
          startTime: undefined,
          endTime: undefined,
          off: false
        },
        {
          name: 'monday',
          startTime: undefined,
          endTime: undefined,
          off: false
        },
        {
          name: 'tuesday',
          startTime: undefined,
          endTime: undefined,
          off: false
        },
        {
          name: 'wednesday',
          startTime: undefined,
          endTime: undefined,
          off: false
        },
        {
          name: 'thursday',
          startTime: undefined,
          endTime: undefined,
          off: false
        },
        {
          name: 'friday',
          startTime: undefined,
          endTime: undefined,
          off: false
        },
        {
          name: 'saturday',
          startTime: undefined,
          endTime: undefined,
          off: false
        }
      ]
    }
  }

  componentDidMount() {
    this.setState({
      availability: this.props.getAvailability(user)
    })
  }

  handleChange = (targetDay, property, time) => {
    this.setState({
      days: this.state.days.map(day => {
        if (day.name === targetDay) {
          //property is either the start time or end time
          return { ...day, [property]: time }
        } else {
          return day
        }
      })
    })
  }

  updateAvailability = () => {
    console.log('update fired')
    this.state.days.map(day => {
      console.log(day)
      this.props.editAvailability(user, {
        start_time: day.startTime,
        end_time: day.endTime,
        off: day.off
      })
    })
  }

  render() {
    console.log(this.state.availability)

    return (
      <div>
        <h5>Edit Availability</h5>
        {this.props.availability.map((a, i) => {
          console.log(this.state.days[i].startTime)

          return (
            <div key={a.id}>
              <Availability
                day={this.state.days[i].name}
                startTime={a.start_time}
                endTime={a.end_time}
                off={a.off}
                name={this.state.days[i]}
                startTimeValue={this.state.days[i].startTime}
                endTimeValue={this.state.days[i].endTime}
                handleChange={this.handleChange}
                submit={this.props.getAvailability}
              />
            </div>
          )
        })}
        <button onClick={this.updateAvailability}>submit</button>
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
