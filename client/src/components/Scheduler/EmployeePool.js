import React from 'react'
import EmployeeResource from './EmployeeResource'
import styled from '@emotion/styled'
import system from '../../design/theme'

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
  max-height: 150vh;
  min-width: 344px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${system.color.lightgrey};
    width: 8px;
    border-radius: 50px;
  }
`
