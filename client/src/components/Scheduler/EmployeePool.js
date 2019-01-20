import React from 'react'
import EmployeeResource from './EmployeeResource'
import styled from '@emotion/styled'

export default function(props) {
  const { employees, updateDragState } = props
  return (
    <Container>
      {employees.map(employee => (
        <EmployeeResource
          key={employee.id}
          employee={employee}
          updateDragState={updateDragState}
        />
      ))}
    </Container>
  )
}

const Container = styled('div')`
  max-height: 100vh;
  min-width: 344px;
  overflow-y: auto;
`
