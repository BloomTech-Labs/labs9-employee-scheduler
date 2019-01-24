import React, { Component } from 'react'
import Timekeeper from './TimeKeeper'
import Button from './Button'
import styled from '@emotion/styled'
import system from '../../design/theme'
import Zoom from 'react-reveal'
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
    if (Object.keys(hours).length > 0) {
      const { days } = this.state
      this.setState({
        days: {
          ...days,
          [e.target.name]: !days[e.target.name] //change individual day
        },
        dayId: hours[idx].id //keep the data for this day on state
      })
    } else {
      console.log('No hours in database')
    }
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
    const { dayId } = this.state
    let closed
    this.props.hours.hours[idx].closed === 1 ? (closed = 0) : (closed = 1)
    this.setState({
      isOpen: false,
      isClose: false,
      checked: !this.state.checked
    })

    this.props.closeAndOpenHours(dayId, closed, this.props.token)
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

  render() {
    console.log(this.props.hidden)
    return (
      <Container className={this.props.hidden ? 'hidden' : undefined}>
        <Modal>
          {/* opens either a different instance of the timekeeper based on if it's editing open or close time */}

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
                  closedAllDay={e => this.closedAllDay(e, i)}
                >
                  {this.props.children}
                </Button>
              )
            })}
          </div>
        </Modal>
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
  z-index: 11;
  background-color: ${system.color.neutral};
  display: flex;
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

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  opacity: 1;
  background: hsla(0, 1%, 36%, 0.72);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0s, z-index 0s, opacity 0.5s linear;

  & > div {
    transition: transform 0.5s linear;
  }

  &.hidden {
    z-index: -1;
    opacity: 0;
    transition: z-index 0.9s, opacity 0.5s linear;

    & > div {
      transform: scaleY(0);
      transition: transform 0.5 linear;
    }
  }
`
