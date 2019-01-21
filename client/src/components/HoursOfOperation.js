import React, { Component } from 'react'
import Timekeeper from './HoursOfOperationModal/TimeKeeper'
import Button from './HoursOfOperationModal/Button'
import styled from '@emotion/styled'
import system from '../design/theme'
import Zoom from 'react-reveal'
import { connect } from 'react-redux'
import {
  editOpenHours,
  editCloseHours,
  fetchHoursFromDB,
  closeAndOpenHours
} from '../actions/'

class HoursOfOperation extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false, // open time clock show/hide
      isClose: false, // close time clock show/hide
      time: '',
      show: false, // show or hide the open/close buttons
      days: {
        // which day clock is open
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
      },
      dayId: '' // selected day id
    }
  }

  componentDidMount() {
    if (this.props.user !== null) {
      const organization_id = '3cf77159-32e3-4812-9740-67e5c065bbca'
      this.props.fetchHoursFromDB(organization_id, this.props.token)
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.errors ? { errors: nextProps.errors } : null
  }

  // //opens the correct version of the timekeeper so it sends back
  //either open time or close time
  handleHours = e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.target.name === 'open') {
      this.setState({ isOpen: true, isClose: false })
    } else {
      this.setState({ isOpen: false, isClose: true })
    }
  }

  // slides out clock
  showHandleHours = (e, idx) => {
    e.preventDefault()
    e.stopPropagation()

    const { hours } = this.props.hours
    const { days } = this.state

    this.setState({
      days: {
        ...days,
        [e.target.name]: !days[e.target.name] //change individual day
      },
      dayId: hours[idx].id //keep the data for this day on state
    })
  }

  //closes the time keeper and sets the time on state that we want to send back to the DB
  saveOpenTime = time => {
    const { dayId } = this.state
    this.setState({
      dayData: { ...this.state.dayData, open_time: time },
      isOpen: false,
      isClose: false
    })

    this.props.editOpenHours(dayId, time, this.props.token)
  }

  saveCloseTime = time => {
    const { dayId } = this.state
    this.setState({
      dayData: { ...this.state.dayData, close_time: time },
      isOpen: false,
      isClose: false
    })

    this.props.editOpenHours(dayId, time, this.props.token)
  }

  closedAllDay = () => {
    // const { organization_id } = this.props.user
    const organization_id = '3cf77159-32e3-4812-9740-67e5c065bbca'

    // this.props.closeAndOpenHours(organization_id, hours, this.props.token)
  }

  render() {
    return (
      <Container>
        {/* opens either a diffeernce instance of the timekeeper based on if it's editing open or close time */}

        {this.state.isOpen === true ? (
          <Zoom right>
            <Timekeeper
              name="open"
              saveAndClose={this.saveOpenTime}
              day={`Open time`}
            />
          </Zoom>
        ) : this.state.isClose === true ? (
          <Zoom right>
            <Timekeeper
              name="close"
              saveAndClose={this.saveCloseTime}
              day={`Close time`}
            />
          </Zoom>
        ) : null}
        <div className="days-container">
          <h3>Hours of Operation</h3>
          {/* maps over the days and places a pair of edit buttons for each one */}
          {Object.keys(this.state.days).map((day, i) => {
            return (
              <Button
                id={i}
                key={i}
                handleHours={this.handleHours}
                day={this.state.days[day]}
                name={day}
                showHandleHours={e => this.showHandleHours(e, i)}
                closedAllDay={this.closedAllDay}
              >
                {this.props.children}
              </Button>
            )
          })}
        </div>
      </Container>
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

const Container = styled.div`
  position: absolute;
  right: 10px;
  top: 40px;
  display: flex;
  flex-direction: row;
  box-shadow: ${system.shadows.other};
  padding: ${system.spacing.standardPadding};
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
