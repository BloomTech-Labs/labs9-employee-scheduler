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
      isOpen: false,
      isClose: false,
      time: '',
      show: false,
      days: {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
      },
      selectedDay: null,
      dayIndex: null,
      error: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const organization_id = '3cf77159-32e3-4812-9740-67e5c065bbca'
    if (this.props.user !== nextProps.user.user) {
      this.props.fetchHoursFromDB(organization_id, this.props.token)
    }

    if (this.props.hours.hours !== nextProps.hours.hours) {
      this.props.fetchHoursFromDB(organization_id, this.props.token)
    }
  }

  // componentDidMount() {
  //   if (this.props.user && !this.props.hours) {
  //     // const { organization_id } = this.props.user
  //     const organization_id = '3cf77159-32e3-4812-9740-67e5c065bbca'
  //     this.props.fetchHoursFromDB(organization_id, this.props.token)
  //     console.log(this.props.hours)
  //   }
  // }

  // componentDidUpdate(nextProps) {
  //   if (this.props.user !== nextProps.user) {
  //     // const { organization_id } = this.props.user
  //     const organization_id = '3cf77159-32e3-4812-9740-67e5c065bbca'
  //     this.props.fetchHoursFromDB(organization_id, this.props.token)
  //     console.log(this.props.hours)
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.errors ? { errors: nextProps.errors } : null
  }

  // //opens the correct version of the timekeeper so it sends back
  //either open time or close time
  handleHours = e => {
    if (e.target.name === 'open') {
      this.setState({ isOpen: true, isClose: false })
    } else {
      this.setState({ isOpen: false, isClose: true })
    }
  }

  // slides out clock
  showHandleHours = e => {
    e.preventDefault()
    // const { organization_id } = this.props.user
    const dayId = e.target.id
    let newId
    const organization_id = '3cf77159-32e3-4812-9740-67e5c065bbca'
    const { days } = this.state
    const { token } = this.props
    const { hours } = this.props.hours
    this.props.fetchHoursFromDB(organization_id, token)
    this.setState({
      days: {
        ...days,
        [e.target.name]: !days[e.target.name]
      },
      selectedDay: parseInt(dayId)
    })

    // for (let i = 0; i < hours.length; i++) {
    //   if (dayId === hours[i]) return (newId = hours[i])
    // }
    console.log(hours.length)

    // console.log(currentDay)
  }

  //closes the time keeper and sets the time on state that we want to send back to the DB
  saveOpenTime = time => {
    // const { organization_id } = this.props.user
    const organization_id = '3cf77159-32e3-4812-9740-67e5c065bbca'
    const day = this.state.selectedDay
    if (organization_id) {
      //  this function takes org organization_id and new updated time data
      this.props.editOpenHours(organization_id, time, this.props.token, day)
      // this opens and closes the clock
      this.setState({ isOpen: false, isClose: false, time: time })
    }
  }

  saveCloseTime = time => {
    // const { organization_id } = this.props.user
    const organization_id = '3cf77159-32e3-4812-9740-67e5c065bbca'
    if (organization_id) {
      this.props.editCloseHours(organization_id, time, this.props.token)
      // this opens and closes the clock
      this.setState({ isOpen: false, isClose: false, time: time })
    }
  }

  closedAllDay = () => {
    // const { organization_id } = this.props.user
    const organization_id = '3cf77159-32e3-4812-9740-67e5c065bbca'
    let hours
    this.props.hours.hours === 0 ||
    this.props.hours.hours === '' ||
    this.props.hours.hours === null ||
    this.props.hours.hours === undefined
      ? (hours = false)
      : (hours = true)
    this.props.closeAndOpenHours(organization_id, hours, this.props.token)
  }

  render() {
    return (
      <Container>
        {/* opens either a diffeernce instance of the timekeeper based on if it's editing open or close time */}

        {this.state.isOpen === true ? (
          <Zoom right>
            <Timekeeper name="open" saveAndClose={this.saveOpenTime} />
          </Zoom>
        ) : this.state.isClose === true ? (
          <Zoom right>
            <Timekeeper name="close" saveAndClose={this.saveCloseTime} />
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
                showHandleHours={this.showHandleHours}
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
