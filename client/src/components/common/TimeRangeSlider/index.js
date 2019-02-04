import React, { Component } from 'react'
import InputRange from 'react-input-range'
import './styles.css'
import { minuteToTime, timeToMinute } from '../../../utils'
import moment from 'moment'
import PropTypes from 'prop-types'

const formatHours = minutes => {
  let clearMinutes = minutes < 0 ? 0 : minutes
  const time = minuteToTime(clearMinutes, 24)
  return moment({ ...time }).format('h:mm a')
}

class TimeRangeSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onChange = ({ min, max }) => {
    this.props.onChange({
      start: formatHours(min),
      end: formatHours(max)
    })
  }

  onChangeComplete = ({ min, max }) => {
    this.props.onChangeComplete({
      start: formatHours(min),
      end: formatHours(max)
    })
  }

  onChangeStart = ({ min, max }) => {
    this.props.onChangeStart({
      start: formatHours(min),
      end: formatHours(max)
    })
  }

  render() {
    let { start, end } = this.props,
      min = timeToMinute(start),
      max = timeToMinute(end)

    return (
      <InputRange
        disabled={this.props.disabled}
        draggableTrack={this.props.draggableTrack}
        minValue={timeToMinute(this.props.minValue)}
        maxValue={timeToMinute(this.props.maxValue)}
        onChangeStart={this.onChangeStart}
        onChange={this.onChange}
        onChangeComplete={this.onChangeComplete}
        step={15}
        value={{ min, max }}
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
  step: 15
}

export default TimeRangeSlider

TimeRangeSlider.propTypes = {
  disabled: PropTypes.bool.isRequired,
  draggableTrack: PropTypes.bool.isRequired,
  minValue: PropTypes.string.isRequired,
  maxValue: PropTypes.string.isRequired,
  onChangeStart: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeComplete: PropTypes.func.isRequired,
  format: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.object,
  step: PropTypes.number.isRequired
}
