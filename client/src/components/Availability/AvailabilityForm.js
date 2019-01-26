import React, { Component } from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'
import { connect } from 'react-redux'
import { editAvailability } from '../../actions'
import Button from '../common/Button'
import AvailabilitySelect from './AvailabilitySelect'
import Checkbox from './Checkbox'

const dayNameMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const processAvail = avail => {
  return {
    ...avail,
    name: dayNameMap[avail.day],
    updated: false
  }
}

class AvailabilityForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: props.availabilities.map(processAvail)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ days: this.props.availabilities.map(processAvail) })
    }
  }

  handleChange = ({ availability, property, value }) => {
    this.setState({
      days: this.state.days.map(day => {
        if (day.day === availability.day) {
          // "processed' sets the property to a boolean or a number because it defaulted
          // to a string on the server without this
          const processed = property === 'off' ? Boolean(value) : Number(value)
          return { ...day, [property]: processed, updated: true }
        } else {
          return day
        }
      })
    })
  }

  //checks to see which availabilities have been updated and sends the changes to the server
  updateAvailability = () => {
    this.state.days.forEach(day => {
      const { updated, name, ...dayAttribs } = day
      if (updated) {
        console.log(day)
        this.props.editAvailability({
          availability: dayAttribs,
          changes: {
            start_time: day.start_time,
            end_time: day.end_time,
            off: day.off
          },
          token: this.props.token
        })
      }
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
        {this.state.days.map((availability, i) => {
          const { off, name } = availability
          //this function passes the the params the toggle to handleChange and is called in Checkbox
          const toggle = () => {
            this.handleChange({
              availability: availability,
              property: 'off',
              value: !off
            })
          }
          return (
            <Container key={availability.id}>
              <AvailabilitySelect
                handleChange={this.handleChange}
                submit={this.props.getAvailability}
                availability={availability}
              />
              <Checkbox onToggle={toggle} name={name} toggled={off} />
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
    token: state.auth.token
  }
}

export default connect(
  mapStateToProps,
  { editAvailability }
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
