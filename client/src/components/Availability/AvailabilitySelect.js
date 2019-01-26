import React from 'react'
import SelectList from '../common/SelectList'
import options from './AvailabilityOptions'
import styled from '@emotion/styled'
import system from '../../design/theme'
import { formatHours } from '../../utils/index'

const SelectContainer = styled('div')`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`

const Label = styled('label')`
  padding-right: 20px;
  margin-top: 5px;
`
const TimeContainer = styled('div')`
  width: 100px;
`

const roundTo30 = time => {
  return Math.round(time / 0.5) * 0.5
}

const Availability = ({ availability, handleChange, submit }) => {
  const { day, start_time, end_time, name } = availability
  console.log(start_time, end_time)
  //both functions pass in the correct params depending on if it's for start or end time.
  const handleUpdateStart = e => {
    handleChange({
      availability,
      value: e.target.value,
      property: 'start_time'
    })
  }
  const handleUpdateEnd = e => {
    handleChange({
      availability,
      value: e.target.value,
      property: 'end_time'
    })
  }
  return (
    <fieldset>
      <legend>{name}</legend>
      <SelectContainer>
        <TimeContainer>
          <Label htmlFor={`${name}-start`}>
            Start: {formatHours(start_time)}
          </Label>
        </TimeContainer>
        <SelectList
          name={`${name}-start`}
          id={`${name}-start`}
          value={roundTo30(start_time)}
          //see function above
          changeHandler={handleUpdateStart}
          options={options}
        />
      </SelectContainer>
      <SelectContainer>
        <TimeContainer>
          <Label htmlFor={`${day}-end`}>End: {formatHours(end_time)}</Label>
        </TimeContainer>
        <SelectList
          name={`${day}-end`}
          id={`${day}-end`}
          value={roundTo30(end_time)}
          //see function above
          changeHandler={handleUpdateEnd}
          options={options}
          ariaLabel="end time"
        />
      </SelectContainer>
    </fieldset>
  )
}

export default Availability
