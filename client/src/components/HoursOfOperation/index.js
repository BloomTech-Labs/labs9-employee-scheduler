import React, { Component } from 'react'
import Button from './Button'
import styled from '@emotion/styled'
import system from '../../design/theme'
import moment from 'moment'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { formatHours } from '../../utils'
import { editHours, fetchHoursFromDB, closeAndOpenHours } from '../../actions/'

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
  console.log(day)
  return day
}

class HoursOfOperation extends Component {
  constructor(props) {
    super(props)
    this.featureRef = React.createRef()

    this.state = {
      days: this.props.hours.hours.map(buildDay),
      initialTime: null,
      // time: '',
      // days: {
      //   // which day clock is open
      //   sunday: { start: '12:00am', end: '11:59pm' },
      //   monday: { start: '12:00am', end: '11:59pm' },
      //   tuesday: { start: '12:00am', end: '11:59pm' },
      //   wednesday: { start: '12:00am', end: '11:59pm' },
      //   thursday: { start: '12:00am', end: '11:59pm' },
      //   friday: { start: '12:00am', end: '11:59pm' },
      //   saturday: { start: '12:00am', end: '11:59pm' }
      // },
      // value: {
      //   start: '12:00am',
      //   end: '11:59pm'
      // },
      // openTime: null,
      // closeTime: null,
      // dayId: '', // selected day id
      checked: new Map()
    }
  }

  closedAllDay = (e, idx) => {
    e.preventDefault()
    e.stopPropagation()
    const { hours } = this.props.hours
    //gets the id for the affected close/open day
    const id = hours[idx].id
    //checks if this day is open or closed and saves the boolean
    let closed
    hours[idx].closed === true ? (closed = false) : (closed = true)
    this.setState({
      checked: !this.state.checked
    })

    this.props.closeAndOpenHours(id, closed, this.props.token)
  }

  checkBox = e => {
    e.stopPropagation()
    const item = e.target.name
    const isChecked = e.target.checked
    this.setState(function(prevState) {
      return {
        checked: !prevState.checked.set(item, isChecked)
      }
    })
  }

  handleCheck = e => {
    e.persist()
    console.log(e.target)
  }

  // for submitting all of the hours
  // submitHandler = (times) => {
  //   const start = parseFloat(moment(times.start, 'h:mm a').format('HH.MM'))
  //   const end = parseFloat(moment(times.end, 'h:mm a').format('HH.MM'))
  //   const { hours } = this.props.hours
  //   // //gets the id for the affected close/open day
  //   const id = hours[i].id
  //   this.props.editHours(id, start, end, this.props.token)
  // }

  // handles the slider position when the user is done sliding
  onChangeComplete = (time, targetDay) => {
    // breaks object up and sets minutes to proper interval for server
    this.setState(prevState => {
      const { days, initialTime } = prevState
      return {
        day: days.map(day => {
          if (day.name === targetDay.name) {
            const equals =
              initialTime.start !== targetDay.start ||
              initialTime.end !== targetDay.end
            return { ...day, start: time.start, end: time.end, updated: equals }
          } else {
            return day
          }
        })
      }
    })
  }

  // handles recording positions when the slider moves
  timeChangeHandler(time, targetDay) {
    console.log(time, targetDay)
    this.setState(prevState => {
      return {
        day: prevState.days.map(day => {
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
            // const { days } = this.state
            // const { hours } = this.props.hours
            return (
              <>
                <Button
                  // props to days and close/open button
                  id={i}
                  key={i}
                  handleHours={this.handleHours}
                  day={day}
                  name={day.name}
                  closedAllDay={e => this.closedAllDay(e, i)}
                  toggled={day.closed}
                  status={day.closed ? 'Open' : 'Closed'}
                  ///////////////////
                  // slider props //
                  disabled={!day.closed} //disabled if day is closed
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
              </>
            )
          })}
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
  { editHours, fetchHoursFromDB, closeAndOpenHours }
)(HoursOfOperation)

HoursOfOperation.propTypes = {
  editHours: propTypes.func.isRequired,
  fetchHoursFromDB: propTypes.func.isRequired,
  closeAndOpenHours: propTypes.func.isRequired,
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
