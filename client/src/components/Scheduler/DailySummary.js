import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'

export default function DailySummary(props) {
  const { hours, day, employees } = props.summary
  return (
    <Div>
      <h6>{day}</h6>
      <p>{`Employees: ${employees}`}</p>
      <p>{`Total Hours: ${Math.round(hours)}`}</p>
    </Div>
  )
}

const Div = styled.div`
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  background: ${system.color.white};
  padding: ${system.spacing.bigPadding};
  border-radius: ${system.borders.bigRadius};
  box-shadow: ${system.shadows.otherLight};
  width: 150px;

  h6 {
    font-size: ${system.fontSizing.sm};
    text-transform: uppercase;
    margin-bottom: 1rem;
    color: ${system.color.primary};
  }

  p {
    font-size: ${system.fontSizing.s};
    margin-bottom: 0.5rem;
  }
`
