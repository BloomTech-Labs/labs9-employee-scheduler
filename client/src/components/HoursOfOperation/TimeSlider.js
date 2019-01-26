import React from 'react'
import TimeRangeSlider from 'react-time-range-slider'
import styled from '@emotion/styled'
import moment from 'moment'
import system from '../../design/theme'

class TimeSlider extends React.Component {
  constructor(props) {
    super(props)
    this.featureRef = React.createRef()
    this.state = {
      value: {
        start: '00:00',
        end: '23:59'
      },
      openTime: null,
      closeTime: null
    }
  }

  changeStartHandler = time => {
    return time
  }

  timeChangeHandler = time => {
    this.setState({
      value: time
    })
  }

  changeCompleteHandler = newTime => {
    let start = newTime.start.hours + newTime.start.minutes / 60
    let newStart = start.toFixed(2)
    let end = newTime.end.hours + newTime.end.minutes / 60
    let newEnd = end.toFixed(2)

    // console.log()
    this.setState({ openTime: newStart, closeTime: newEnd })
  }

  render() {
    const { start, end } = this.state.value
    return (
      <Slider>
        <TimeRangeSlider
          disabled={this.props.disabled}
          dragableTrack={true}
          format={24}
          minValue={'00:00'}
          maxValue={'23:59'}
          name={this.props.name}
          onChangeStart={this.changeStartHandler}
          onChangeComplete={this.changeCompleteHandler}
          onChange={this.timeChangeHandler}
          step={15}
          value={this.state.value}
        />
        <div>
          <p>
            {start} to {end}
          </p>
        </div>
      </Slider>
    )
  }
}

export default TimeSlider

const Slider = styled.div`
  z-index: -1;
  p {
    font-size: ${system.fontSizing.sm};
    margin-top: 5px;
    margin-left: 25px;
  }
`
