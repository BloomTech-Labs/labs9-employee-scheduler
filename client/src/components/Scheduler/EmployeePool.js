import React from 'react'
import EmployeeResource from './EmployeeResource'
import styled from '@emotion/styled'
import system from '../../design/theme'

export default function(props) {
  const { employees, updateDragState, width } = props
  return (
    <React.Fragment>
      {/* Spacer is provided to block out room for the Employee Side Bar, which is positioned absolute and therefore taken out of flow */}
      <Spacer />
      <Container>
        {employees.map(employee => (
          <EmployeeResource
            key={employee.id}
            employee={employee}
            updateDragState={updateDragState}
          />
        ))}
      </Container>
    </React.Fragment>
  )
}

const Container = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 344px;
  @media ${system.breakpoints[1]} {
    width: 260px;
  }
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  background-color: ${system.color.neutralDark};

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${system.color.lightgrey};
    width: 8px;
    border-radius: 50px;
  }
`

const Spacer = styled.div`
  width: 360px;
  @media ${system.breakpoints[1]} {
    width: 280px;
  }
  height: 100%;
`
