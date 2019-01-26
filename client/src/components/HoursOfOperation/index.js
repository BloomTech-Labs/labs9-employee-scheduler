import React, { Component } from 'react'
import Timekeeper from './TimeKeeper'
import Button from './Button'
import styled from '@emotion/styled'
import system from '../../design/theme'
import Fade from 'react-reveal'
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
      time: '',
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
      value: {
        start: '00:00',
        end: '23:59'
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

  // //opens the correct version of the timekeeper so it sends back
  //either open time or close time

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
            const { hours } = this.props.hours
            return (
              <Button
                id={i}
                key={i}
                handleHours={this.handleHours}
                day={this.state.days[day]}
                name={day}
                closedAllDay={e => this.closedAllDay(e, i)}
                toggled={hours[i].closed}
                status={hours[i].closed ? 'Open' : 'Closed'}
                // slider props
                disabled={!hours[i].closed}
              >
                {this.props.children}
              </Button>
            )
          })}
          <button>Submit</button>
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
  width: 173px;
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
