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
  width: 344px;
  flex-grow: 0;
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${system.color.lightgrey};
    width: 8px;
    border-radius: 50px;
  }
`
