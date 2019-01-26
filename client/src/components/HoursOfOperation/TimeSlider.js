import React from 'react'
import TimeRangeSlider from 'react-time-range-slider'
import styled from '@emotion/styled'
import moment from 'moment'

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
    // console.log('Start Handler Called', time)
  }

  timeChangeHandler = time => {
    this.setState({
      value: time
    })
  }

  changeCompleteHandler = newTime => {
    let start = newTime.start.hours + newTime.start.minutes / 60
    let end = newTime.end.hours + newTime.end.minutes / 60

    // console.log()
    this.setState({ openTime: start, closeTime: end })
  }

  render() {
    return (
      <Slider>
        <TimeRangeSlider
          disabled={this.props.disabled}
          dragableTrack={true}
          format={24}
          maxValue={'23:59'}
          minValue={'00:00'}
          name={this.props.name}
          onChangeStart={this.changeStartHandler}
          onChangeComplete={this.changeCompleteHandler}
          onChange={this.timeChangeHandler}
          step={15}
          value={this.state.value}
        />
      </Slider>
    )
  }
}

export default TimeSlider

const Slider = styled.div`
  z-index: -1;
`
