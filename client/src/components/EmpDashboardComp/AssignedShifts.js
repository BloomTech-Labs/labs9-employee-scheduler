import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'

const AssignedSifts = props => {
  return (
    <Container>
      {props.employee.shifts.map(item => {
        return (
          <div className="title" key={item.id}>
            <h5>Assigned Shifts</h5>
            {item.shifts.map(assigned => {
              return (
                <div className="details" key={assigned.id}>
                  <div>
                    <p>{assigned.date}</p>
                  </div>
                  <div>
                    <p>{assigned.times}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </Container>
  )
}

export default AssignedSifts

AssignedSifts.propTypes = {
  // adding propTypes here
}

const Container = styled('div')``
