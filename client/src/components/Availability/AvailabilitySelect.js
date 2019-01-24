import React from 'react'
import Form from '../Form/index'
import SelectList from '../common/SelectList'
import options from './AvailabilityOptions'

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
      <Form.Group>
        <Form.Label>Day: {props.day}</Form.Label>
      </Form.Group>
      <p>Start Time: {props.startTime} </p>
      <SelectList
        label="start time"
        name={props.startTimeValue}
        value={props.startTimeValue}
        //see function above
        changeHandler={handleUpdateStart}
        options={options}
        ariaLabel="start time"
      />
      <p>End Time: {props.endTime}</p>
      <SelectList
        label="end time"
        name={props.day}
        value={props.endTimeValue}
        //see function above
        changeHandler={handleUpdateEnd}
        options={options}
        ariaLabel="end time"
      />
    </div>
  )
}

export default Availability
