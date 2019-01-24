import React from 'react'
import EmployeeResource from './EmployeeResource'
import styled from '@emotion/styled'
import system from '../../design/theme'

export default function(props) {
  const { employees, updateDragState, width } = props
  return (
    <React.Fragment>
      <Spacer width={width} />
      <Container width={width}>
        {employees.map(employee => (
          <EmployeeResource
            key={employee.id}
            employee={employee}
            updateDragState={updateDragState}
            width={width}
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
  width: ${props => (props.width === 'desktop' ? '344px' : '260px')};
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
  width: ${props => (props.width === 'desktop' ? '360px' : '280px')};
  height: 100%;
`
