import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'
import moment from 'moment'

export default function DailySummary(props) {
  const { hours, day, employees } = props.summary
  return (
    <Div>
      <h6>{moment(day).format('M/D')}</h6>
      <p>People</p>
      <p className="line">{employees}</p>
      <p>Hours</p>
      <p>{Math.round(hours)}</p>
    </Div>
  )
}

const Div = styled.div`
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  align-items: center;
  background: ${system.color.white};
  width: 100%;
  padding: 20px 0px;
  border-radius: ${system.borders.bigRadius};
  box-shadow: ${system.shadows.otherLight};
  h6 {
    font-size: ${system.fontSizing.sm};
    text-transform: uppercase;
    margin-bottom: 1rem;
    color: ${system.color.primary};
  }

  p {
    font-size: ${system.fontSizing.s};
    margin-bottom: 0.5rem;
    text-align: center;
    padding-bottom: 10px;

    &.line {
      position: relative;
      border-bottom: ${system.borders.grey};
      margin-bottom: 10px;
    }
  }
`
