import React, { Component } from 'react'
// import TimeRangeSlider from './TimeSlider'
import Button from './Button'
import styled from '@emotion/styled'
import system from '../../design/theme'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  editOpenHours,
  editCloseHours,
  fetchHoursFromDB,
  closeAndOpenHours
} from '../../actions/'

class HoursOfOperation extends Component {
  constructor(props) {
    super(props)
    this.featureRef = React.createRef()
    this.state = {
      time: '',
      days: {
        // which day clock is open
        sunday: { start: '12:00am', end: '11:59pm' },
        monday: { start: '12:00am', end: '11:59pm' },
        tuesday: { start: '12:00am', end: '11:59pm' },
        wednesday: { start: '12:00am', end: '11:59pm' },
        thursday: { start: '12:00am', end: '11:59pm' },
        friday: { start: '12:00am', end: '11:59pm' },
        saturday: { start: '12:00am', end: '11:59pm' }
      },
      value: {
        start: '12:00am',
        end: '11:59pm'
      },
      openTime: null,
      closeTime: null,
      dayId: '', // selected day id
      checked: new Map()
    }
  }

  componentDidMount() {
    if (this.props.user !== null) {
      const { organization_id } = this.props.user
      this.props.fetchHoursFromDB(organization_id, this.props.token)
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.errors ? { errors: nextProps.errors } : null
  }

  //closes the time keeper and sets the time on state that we want to send back to the DB
  saveOpenTime = time => {
    const { dayId } = this.state
    this.setState(function(prevState) {
      return {
        isOpen: !prevState.isOpen,
        isClose: !prevState.isClosed
      }
    })

    this.props.editOpenHours(dayId, time, this.props.token)
  }

  saveCloseTime = time => {
    const { dayId } = this.state
    this.setState(function(prevState) {
      return {
        isOpen: !prevState.isOpen,
        isClose: !prevState.isClosed
      }
    })
    this.props.editOpenHours(dayId, time, this.props.token)
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

  onChangeComplete = (newTime, i) => {
    console.log('changeCompleteHandler fired')
    // breaks object up and sets minutes to proper interval for server
    // let start = newTime.start.hours + newTime.start.minutes / 60
    // let newStart = start.toFixed(2)
    // let end = newTime.end.hours + newTime.end.minutes / 60
    // let newEnd = end.toFixed(2)

    // // console.log()
    // this.setState({ openTime: newStart, closeTime: newEnd })
  }
  timeChangeHandler(currentTime, idx, time) {
    console.log('timeChangeHandler fired')

    // console.log(currentTime)
    // console.log(idx)
    // this.setState({
    //   value: time
    // })
    // Object.keys(this.state.days).map(day =>
    //   this.setState({ [day]: currentTime })
    // )
    this.onChangeComplete()
  }

  changeStartHandler = (currentTime, idx) => {
    // set's the time for the currently picked day, bad idea because it sets every frame (that's crazy)
    this.setState({
      value: currentTime
    })
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
          {Object.keys(this.state.days).map((day, i) => {
            const { days } = this.state
            const { hours } = this.props.hours
            return (
              <>
                <Button
                  id={i}
                  key={i}
                  handleHours={this.handleHours}
                  day={days[day]}
                  name={day}
                  closedAllDay={e => this.closedAllDay(e, i)}
                  toggled={hours[i].closed}
                  status={hours[i].closed ? 'Open' : 'Closed'}
                  // slider props
                  disabled={!hours[i].closed}
                  draggableTrack={true}
                  open_time={hours[i].open_time}
                  close_time={hours[i].close_time}
                  onChangeComplete={this.onChangeComplete}
                  onChange={this.timeChangeHandler}
                  onChangeStart={() => this.changeStartHandler(days[day], i)}
                  value={days[day]}
                  start={days[day].start}
                  end={days[day].end}
                  minValue={'12:00am'}
                  maxValue={'11:59pm'}
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
  { editOpenHours, editCloseHours, fetchHoursFromDB, closeAndOpenHours }
)(HoursOfOperation)

HoursOfOperation.propTypes = {
  editOpenHours: propTypes.func.isRequired,
  editCloseHours: propTypes.func.isRequired,
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
