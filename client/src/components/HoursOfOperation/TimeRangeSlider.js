import React, { Component } from 'react'
import InputRange from 'react-input-range'
import './styles.css'
import { minuteToTime, timeToMinute } from '../../utils'
import moment from 'moment'

const formatHours = minutes => {
  const time = minuteToTime(minutes)
  return moment({ ...time })
}

class TimeRangeSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onChange = ({ start, end }) => {
    this.props.onChangeStart({
      start: formatHours(start),
      end: formatHours(end)
    })
  }

  onChangeComplete = ({ start, end }) => {
    this.props.onChangeComplete({
      start: formatHours(start),
      end: formatHours(end)
    })
  }

  onChangeStart = ({ start, end }) => {
    this.props.onChangeStart({
      start: formatHours(start),
      end: formatHours(end)
    })
  }

  render() {
    let { start, end } = this.props,
      startMin = timeToMinute(start),
      endMin = timeToMinute(end)
    console.log(start)
    console.log(startMin)
    console.log(end)
    console.log(endMin)

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
        value={{ start: startMin, end: endMin }}
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
