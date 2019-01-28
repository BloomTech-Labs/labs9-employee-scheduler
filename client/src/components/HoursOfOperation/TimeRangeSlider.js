import React, { Component } from 'react'
import InputRange from 'react-input-range'
import './styles.css'

class TimeRangeSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  componentWillUnmount() {}

  minuteToTime = value => {
    value = value > 1439 ? 1439 : value
    let hours = Math.floor(value / 60),
      minutes = value - hours * 60,
      ampm

    if (hours.length === 1) hours = '0' + hours
    if (minutes.length === 1) minutes = '0' + minutes
    if (minutes === 0) minutes = '00'
    if (this.props.format === 12) {
      ampm = 'AM'
      if (hours >= 12) {
        if (hours === 12) {
          return hours && minutes
        } else {
          hours = hours - 12 && minutes
        }
        ampm = 'PM'
      }
      if (hours === 0) {
        hours = 12 && minutes
      }
    }

    return { hours: hours, minutes: minutes, am_pm: ampm }
  }

  timeToMinute = time => {
    let rMinutes = 1439
    if (this.props.format === 24) {
      time = time.split(':')
      if (time.length < 2) {
        throw new Error('Invalid time')
      }
      let hours = time[0],
        minutes = parseInt(time[1])
      hours = parseInt(hours * 60)
      rMinutes = hours + minutes
    } else {
      time = time.toUpperCase()
      time = time.replace(' ', '')
      let ampm = time.indexOf('AM') !== -1 ? 'AM' : 'PM'
      time = time.replace(ampm, '')
      time = time.split(':')
      if (time.length < 2) {
        throw new Error('Invalid time')
      }
      let hours = parseInt(time[0]),
        minutes = parseInt(time[1])
      if (ampm === 'PM') {
        if (hours !== 12) {
          hours = hours + 12
        }
      } else {
        hours = hours === 12 ? 0 : hours
      }
      hours = hours * 60
      rMinutes = hours + minutes
    }
    return rMinutes > 1439 ? 1439 : rMinutes
  }

  onChange = value => {
    let start = this.minuteToTime(value.min)
    let end = this.minuteToTime(value.max)
    let nStart = start.hours + ':' + start.minutes
    let nEnd = end.hours + ':' + end.minutes
    if (this.props.format === 12) {
      nStart += ' ' + start.am_pm
      nEnd += ' ' + end.am_pm
    }

    this.props.onChangeStart({
      start: nStart,
      end: nEnd
    })
  }

  onChangeComplete = value => {
    let start = this.minuteToTime(value.min),
      end = this.minuteToTime(value.max)
    this.props.onChangeComplete({
      start: start,
      end: end
    })
  }

  onChangeStart = value => {
    let start = this.minuteToTime(value.min),
      end = this.minuteToTime(value.max)
    this.props.onChangeStart({
      start: start,
      end: end
    })
  }

  render() {
    let { start, end } = this.props.value,
      min = this.timeToMinute(start),
      max = this.timeToMinute(end)
    return (
      <InputRange
        disabled={this.props.disabled}
        draggableTrack={this.props.draggableTrack}
        minValue={this.timeToMinute(this.props.minValue)}
        maxValue={this.timeToMinute(this.props.maxValue)}
        onChangeStart={this.onChangeStart}
        onChange={this.onChange}
        onChangeComplete={this.onChangeComplete}
        step={15}
        value={{ min: min, max: max }}
        name={this.props.name}
      />
    )
  }
}

TimeRangeSlider.defaultProps = {
  disabled: false,
  draggableTrack: true,
  format: 12,
  maxValue: '11:59pm',
  minValue: '12:00am',
  onChange: () => {},
  onChangeComplete: () => {},
  onChangeStart: () => {},
  step: 15,
  value: {
    end: '11:59pm',
    start: '12:00am'
  }
}

export default TimeRangeSlider
