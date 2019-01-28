import React, { Component } from 'react'
import Button from './Button'
import styled from '@emotion/styled'
import system from '../../design/theme'
import moment from 'moment'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { formatHours } from '../../utils'
import { editHours } from '../../actions/'

const dayNameMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const buildDay = HOO => {
  const day = {
    updated: false,
    start: formatHours(HOO.open_time),
    end: formatHours(HOO.close_time),
    closed: HOO.closed,
    id: HOO.id,
    name: dayNameMap[HOO.day]
  }
  return day
}

class HoursOfOperation extends Component {
  constructor(props) {
    super(props)
    this.featureRef = React.createRef()

    this.state = {
      days: this.props.hours.hours.map(buildDay),
      initialTime: null,
      checked: new Map()
    }
  }

  closedAllDay = targetDay => {
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

  // for submitting all of the hours
  submitHandler = () => {
    this.state.days.forEach(day => {
      if (day.updated) {
        const start = parseFloat(moment(day.start, 'h:mm a').format('HH.MM'))
        const end = parseFloat(moment(day.end, 'h:mm a').format('HH.MM'))
        const closed = day.closed
        this.props.editHours(
          day.id,
          { open_time: start, close_time: end, closed },
          this.props.token
        )
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
      <Modal>
        {/* opens either a different instance of the timekeeper based on if it's editing open or close time */}
        <div className="days-container">
          <Close />
          <h3>Hours of Operation</h3>
          {/* maps over the days and places a pair of edit buttons for each one */}
          {this.state.days.map((day, i) => {
            return (
              <Button
                // props to days and close/open button
                id={i}
                key={day.id}
                handleHours={this.handleHours}
                day={day}
                name={day.name}
                closedAllDay={() => this.closedAllDay(day)}
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
              </Button>
            )
          })}
          <button onClick={this.submitHandler}>Submit</button>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
  hours: state.hours
})

export default connect(
  mapStateToProps,
  { editHours }
)(HoursOfOperation)

HoursOfOperation.propTypes = {
  editHours: propTypes.func.isRequired,
  showHandleHours: propTypes.func,
  closeAllDay: propTypes.func,
  handleHours: propTypes.func,
  saveCloseTime: propTypes.func,
  saveOpenTime: propTypes.func
}

const Modal = styled.div`
  /* position: absolute;
  right: 10px;
  bottom: 40px; */
  border-radius: 5px;
  width: 500px;
  z-index: 11;
  background-color: ${system.color.neutral};
  display: flex;
  justify-content: center;
  flex-direction: row;
  box-shadow: ${system.shadows.other};
  padding: ${system.spacing.standardPadding};
  opacity: 1;
  .days-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 1.6rem;
      margin-bottom: 10px;
    }
  }
`
