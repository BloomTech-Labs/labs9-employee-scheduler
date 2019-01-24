import React from 'react'
import Form from '../Form/index'
import SelectList from '../common/SelectList'
import options from './AvailabilityOptions'
import styled from '@emotion/styled'
import system from '../../design/theme'
import Checkbox from './Checkbox'

const SelectContainer = styled('div')`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`

const P = styled('p')`
  padding-right: 20px;
  margin-top: 5px;
`
const TimeContainer = styled('div')`
  width: 100px;
`

const Availability = props => {
  //both functions pass in the correct params depending on if it's for start or end time.
  const handleUpdateStart = e => {
    props.handleChange(
      props.day,
      'startTime',
      e.target.value,
      props.availability
    )
  }
  const handleUpdateEnd = e => {
    props.handleChange(props.day, 'endTime', e.target.value, props.availability)
  }
  return (
    <div key={props.id}>
      <label htmlFor="">{props.day}</label>
      <SelectContainer>
        <TimeContainer>
          <P>Start Time: {props.startTime} </P>
        </TimeContainer>
        <SelectList
          // label="start time"
          name={props.startTimeValue}
          value={props.startTimeValue}
          //see function above
          changeHandler={handleUpdateStart}
          options={options}
          ariaLabel="start time"
        />
      </SelectContainer>
      <SelectContainer>
        <TimeContainer>
          <P>End Time: {props.endTime}</P>
        </TimeContainer>
        <SelectList
          // label="end time"
          name={props.day}
          value={props.endTimeValue}
          //see function above
          changeHandler={handleUpdateEnd}
          options={options}
          ariaLabel="end time"
        />
      </SelectContainer>
    </div>
  )
}

export default Availability
