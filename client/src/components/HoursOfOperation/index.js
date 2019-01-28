import React, { Component } from 'react'
import Button from './Button'
import styled from '@emotion/styled'
import system from '../../design/theme'
import moment from 'moment'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { editHours, fetchHoursFromDB, closeAndOpenHours } from '../../actions/'

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

  // handles the slider position when the user is done sliding
  onChangeComplete = (num, i) => {
    // breaks object up and sets minutes to proper interval for server
    const start = parseFloat(moment(num.start, 'h:mm a').format('HH.MM'))
    const end = parseFloat(moment(num.end, 'h:mm a').format('HH.MM'))

    const { hours } = this.props.hours
    // //gets the id for the affected close/open day
    const id = hours[i].id
    // Object.keys(this.state.days).map(day => {
    //   if (day[day] === this.state.days[day]) {
    //     return this.setState({ [day]: { start: start, end: end } })
    //   } else {
    //     return null
    //   }
    // })

    // commented out until I can fix the slider
    this.props.editHours(id, start, end, this.props.token)
  }

  // handles recording positions when the slider moves
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
    this.setState({
      value: currentTime
    })
  }

  // handles returning the starting position of the slider
  changeStartHandler = (currentTime, idx) => {
    return currentTime
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
                  // props to days and close/open button
                  id={i}
                  key={i}
                  handleHours={this.handleHours}
                  day={days[day]}
                  name={day}
                  closedAllDay={e => this.closedAllDay(e, i)}
                  toggled={hours[i].closed}
                  status={hours[i].closed ? 'Open' : 'Closed'}
                  ///////////////////
                  // slider props //
                  disabled={!hours[i].closed} //disabled if day is closed
                  draggableTrack={true} //slide by touching the bar
                  open_time={hours[i].open_time} //open time for day in redux store
                  close_time={hours[i].close_time} //close time for the day in redux store
                  value={this.state.value} //the value for each day on state
                  start={days[day].start} //start of each day
                  end={days[day].end} //end of each day
                  maxValue={'11:59pm'} //max allowed slider value
                  minValue={'12:00am'} // min allowed slider value
                  // functions //
                  onChangeComplete={() =>
                    this.onChangeComplete(this.state.value, i)
                  } // records where the slider ends at (currently only one firing)
                  onChange={this.timeChangeHandler} //handles when the slider moves
                  onChangeStart={() => this.changeStartHandler(days[day], i)} // records the time in which the slider is started at
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
