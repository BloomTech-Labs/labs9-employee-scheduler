import React, { Component } from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'
import { connect } from 'react-redux'
import { editAvailability } from '../../actions'
import Button from '../common/Button'
import { formatHours } from '../../utils'
import moment from 'moment'
import HOOSlider from '../HoursOfOperation/HOOSlider'

const dayNameMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const buildDay = avail => {
  const day = {
    updated: false,
    start: formatHours(avail.start_time),
    end: formatHours(avail.end_time),
    // think about what word is right for 'closed' v 'off'
    closed: avail.off,
    id: avail.id,
    name: dayNameMap[avail.day]
  }
  return day
}

class AvailabilityForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: props.availabilities.map(buildDay),
      initialTime: null
    }
  }

  toggle = targetDay => {
    this.setState(prevState => {
      const { days } = prevState
      return {
        days: days.map(day => {
          if (day.name === targetDay.name) {
            return {
              ...day,
              updated: true,
              closed: !day.closed
            }
          } else {
            return day
          }
        })
      }
    })
  }

  //checks to see which availabilities have been updated and sends the changes to the server
  submitHandler = () => {
    this.state.days.forEach(day => {
      const { updated, name, ...dayAttribs } = day
      if (day.updated) {
        this.props.editAvailability({
          availability: dayAttribs,
          changes: {
            start_time: parseFloat(moment(day.start, 'h:mm a').format('HH.MM')),
            end_time: parseFloat(moment(day.end, 'h:mm a').format('HH.MM')),
            off: day.closed
          },
          token: this.props.token
        })
      }
    })
    this.props.toggleShow()
  }

  // handles the slider position when the user is done sliding
  onChangeComplete = (time, targetDay) => {
    this.setState(prevState => {
      const { days, initialTime } = prevState
      return {
        days: days.map(day => {
          if (day.name === targetDay.name) {
            const notEqual =
              initialTime.start !== targetDay.start ||
              initialTime.end !== targetDay.end
            return {
              ...day,
              start: time.start,
              end: time.end,
              updated: notEqual
            }
          } else {
            return day
          }
        })
      }
    })
  }

  // handles recording positions when the slider moves
  timeChangeHandler(time, targetDay) {
    this.setState(prevState => {
      return {
        days: prevState.days.map(day => {
          if (day.name === targetDay.name) {
            return { ...day, start: time.start, end: time.end }
          } else {
            return day
          }
        })
      }
    })
  }

  // handles returning the starting position of the slider
  changeStartHandler = currentTime => {
    return this.setState({ initialTime: currentTime })
  }

  render() {
    const { Close } = this.props
    return (
      <OuterContainer>
        <Close />
        <h5>{`Edit Availability for ${this.props.first_name}`}</h5>
        {/* maps over all availabilities and displays them with the ability to select changes */}
        {this.state.days.map((day, i) => {
          return (
            <HOOSlider
              // props to days and close/open button
              id={i}
              key={day.id}
              handleHours={this.handleHours}
              day={day}
              name={day.name}
              closedAllDay={() => this.toggle(day)}
              toggled={day.closed}
              status={day.closed === false ? 'Open' : 'Closed'}
              // slider props //
              disabled={day.closed} //disabled if day is closed
              draggableTrack={true} //slide by touching the bar
              start={day.start} //start of each day
              end={day.end} //end of each day
              // functions //
              onChangeComplete={time => this.onChangeComplete(time, day)} // records where the slider ends at (currently only one firing)
              onChange={time => this.timeChangeHandler(time, day)} //handles when the slider moves
              onChangeStart={this.changeStartHandler} // records the time in which the slider is started at
            >
              {this.props.children}
            </HOOSlider>
          )
        })}
        <Button onClick={this.submitHandler}>submit</Button>
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
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: ${system.spacing.standardPadding};
`
const DayGrid = styled('div')`
  /* border: 1px solid gray; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: ${system.spacing.standardPadding};
`

const OuterContainer = styled('div')`
  background-color: ${system.color.neutral};
  padding: ${system.spacing.bigPadding};
`
