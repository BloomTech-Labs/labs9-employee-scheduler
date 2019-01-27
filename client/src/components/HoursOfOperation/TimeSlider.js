import React from 'react'
import TimeRangeSlider from 'react-time-range-slider'
import styled from '@emotion/styled'
import system from '../../design/theme'

class TimeSlider extends React.Component {
  constructor(props) {
    super(props)
    this.featureRef = React.createRef()
    this.state = {
      value: {
        start: '12:00AM',
        end: '11:59PM'
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
    // breaks object up and sets minutes to proper interval for server
    let start = newTime.start.hours + newTime.start.minutes / 60
    let newStart = start.toFixed(2)
    let end = newTime.end.hours + newTime.end.minutes / 60
    let newEnd = end.toFixed(2)

    // console.log()
    this.setState({ openTime: newStart, closeTime: newEnd })
  }

  render() {
    const { start, end } = this.state.value
    const { openTime, closeTime } = this.state
    return (
      <Slider>
        <TimeRangeSlider
          disabled={this.props.disabled}
          dragableTrack={true}
          name={this.props.name}
          format={12}
          minValue={'12:00AM'}
          maxValue={'11:59PM'}
          onChangeStart={this.changeStartHandler}
          onChangeComplete={this.changeCompleteHandler}
          onChange={this.timeChangeHandler}
          step={30}
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
