import React, { useState } from 'react'
import HOOSlider from './common/TimeRangeSlider'
import styled from '@emotion/styled'
import system from '../design/theme'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formatHours, utcDayToLocal } from '../utils'
import { editHours } from '../actions'
import Button from './common/Button'

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
    name: dayNameMap[utcDayToLocal({ day: HOO.day, start: HOO.open_time })]
  }
  return day
}

const HoursOfOperation = props => {
  const [days, setDays] = useState(props.hours.hours.map(buildDay))

  const toggle = targetDay => {
    setDays(
      days.map(day => {
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
    )
  }

  // for submitting all of the hours
  const submitHandler = () => {
    days.forEach(day => {
      if (day.updated) {
        const start = moment(day.start, 'h:mm a')
          .utc()
          .format('HH:mm')
        const end = moment(day.end, 'h:mm a')
          .utc()
          .format('HH:mm')
        const closed = day.closed
        props.editHours(
          day.id,
          { open_time: start, close_time: end, closed },
          props.token
        )
      }
    })
    props.toggleShow()
  }

  // handles recording positions when the slider moves
  const timeChangeHandler = (time, targetDay) => {
    setDays(
      days.map(day => {
        if (day.name === targetDay.name) {
          return { ...day, start: time.start, end: time.end, updated: true }
        } else {
          return day
        }
      })
    )
  }

  const { Close } = props
  return (
    <Modal>
      {/* opens either a different instance of the timekeeper based on if it's editing open or close time */}
      <div className="days-container">
        <Close />
        <h3>What times is your business open?</h3>
        {/* maps over the days and places a pair of edit buttons for each one */}
        {days.map((day, i) => {
          return (
            <HOOSlider
              // props to days and close/open button
              id={i}
              key={day.id}
              // handleHours={handleHours}
              day={day}
              name={day.name}
              closedAllDay={() => toggle(day)}
              toggled={day.closed}
              status={day.closed === false ? 'Open' : 'Closed'}
              // slider props //
              disabled={day.closed} //disabled if day is closed
              draggableTrack={true} //slide by touching the bar
              start={day.start} //start of each day
              end={day.end} //end of each day
              // functions //
              onChange={time => timeChangeHandler(time, day)} //handles when the slider moves
            >
              {props.children}
            </HOOSlider>
          )
        })}
        <Button onClick={submitHandler}>Submit Hours of Operation</Button>
      </div>
    </Modal>
  )
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
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  hours: PropTypes.object.isRequired,
  editHours: PropTypes.func.isRequired,
  showHandleHours: PropTypes.func,
  closeAllDay: PropTypes.func,
  handleHours: PropTypes.func,
  saveCloseTime: PropTypes.func,
  saveOpenTime: PropTypes.func
}

export const Modal = styled.div`
  /* position: absolute;
  right: 10px;
  bottom: 40px; */
  border-radius: 5px;
  width: 100%;
  z-index: 11;
  background-color: ${system.color.white};
  display: flex;
  justify-content: center;
  flex-direction: row;
  box-shadow: ${system.shadows.other};
  padding: ${system.spacing.standardPadding};
  opacity: 1;

  @media ${system.breakpoints[0]} {
    border-radius: 0;
    padding: 20px 5px;
    min-height: 100vh;
  }
  .days-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: ${system.fontSizing.m};
      padding: ${system.spacing.standardPadding};
      margin: 0 10px 20px;
    }
  }
  button {
    width: 30%;
    margin: ${system.spacing.bigPadding};

    @media ${system.breakpoints[1]} {
      width: 80%;
      margin-left: auto;
      margin-right: auto;
    }

    @media ${system.breakpoints[0]} {
      width: 96%;
      margin: 2%;
    }
  }
`
