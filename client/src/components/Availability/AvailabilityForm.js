import React, { Component } from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'
import { connect } from 'react-redux'
import { getAvailability, editAvailability } from '../../actions'
import Button from '../common/Button'
import Availability from './AvailabilitySelect'
import Checkbox from './Checkbox'

const employee = '9474b689-ef77-47a1-ba20-b1bac12beeee'

class AvailabilityForm extends Component {
  constructor() {
    super()
    this.state = {
      days: [
        {
          name: 'Sunday',
          startTime: undefined,
          endTime: undefined,
          off: false
        },
        {
          name: 'Monday',
          startTime: undefined,
          endTime: undefined,
          off: false
        },
        {
          name: 'Tuesday',
          startTime: undefined,
          endTime: undefined,
          off: false
        },
        {
          name: 'Wednesday',
          startTime: undefined,
          endTime: undefined,
          off: false
        },
        {
          name: 'Thursday',
          startTime: undefined,
          endTime: undefined,
          off: false
        },
        {
          name: 'Friday',
          startTime: undefined,
          endTime: undefined,
          off: false
        },
        {
          name: 'Saturday',
          startTime: undefined,
          endTime: undefined,
          off: false
        }
      ]
    }
  }

  componentDidMount() {
    // const employee = this.props.id
    console.log(this.props.id)
    this.props.getAvailability(this.props.id, this.props.token)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      console.log(this.props.id)
      this.props.getAvailability(this.props.id, this.props.token)
    }
  }

  handleChange = (targetDay, property, value, availability) => {
    this.setState({
      days: this.state.days.map(day => {
        if (day.name === targetDay) {
          // "processed' sets the property to a boolean or a number because it defaulted
          // to a string on the server without this
          const processed = property === 'off' ? Boolean(value) : Number(value)
          return { ...day, [property]: processed, availability }
        } else {
          return day
        }
      })
    })
  }

  //checks to see which availabilities have been updated and sends the changes to the server
  updateAvailability = () => {
    this.state.days.forEach(day => {
      return day.availability
        ? //ternary operator
          this.props.editAvailability({
            availability: day.availability,
            changes: {
              start_time: day.startTime,
              end_time: day.endTime,
              off: day.off
            },
            token: this.props.token
          })
        : null
    })
    this.props.toggleShow()
  }

  render() {
    const { Close } = this.props
    return (
      <OuterContainer>
        <Close />
        <h5>{`Edit Availability for ${this.props.first_name}`}</h5>
        {/* maps over all availabilities and displays them with the ability to select changes */}
        {this.props.availability.slice(0, 7).map((a, i) => {
          //this function passes the the params the toggle to handleChange and is called in Checkbox
          const toggle = () => {
            const { name, off } = this.state.days[i]
            this.handleChange(name, 'off', !off, a)
          }
          return (
            <Container key={a.id}>
              <Availability
                // uses local state to display the names of the days because the db sends a number
                day={this.state.days[i].name}
                startTime={a.start_time}
                endTime={a.end_time}
                off={a.off}
                name={this.state.days[i]}
                startTimeValue={this.state.days[i].startTime}
                endTimeValue={this.state.days[i].endTime}
                handleChange={this.handleChange}
                submit={this.props.getAvailability}
                availability={a}
              />
              {/* this is the toggle to change day from "available" to "unavailable" */}
              <Checkbox
                toggleAvailability={toggle}
                name={this.state.days[i].name}
              />
            </Container>
          )
        })}
        <Button onClick={this.updateAvailability}>submit</Button>
      </OuterContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    availability: state.availability.availability,
    token: state.auth.token
  }
}

export default connect(
  mapStateToProps,
  { editAvailability, getAvailability }
)(AvailabilityForm)

const Container = styled('div')`
  /* border: 1px solid gray; */
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const OuterContainer = styled('div')`
  background-color: ${system.color.neutral};
  padding: ${system.spacing.bigPadding};
`
