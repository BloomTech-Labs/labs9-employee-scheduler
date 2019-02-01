import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'
import moment from 'moment'

export default function DailySummary(props) {
  const { hours, day, employees } = props.summary
  return (
    <Div>
      <h6>{moment(day).format('M/D')}</h6>
      <p>People Working</p>
      <p className="line big">{employees}</p>
      <p>Total Hours</p>
      <p className="big">{Math.round(hours)}</p>
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
    cursor: default;
  }

  p {
    font-size: ${system.fontSizing.s};
    margin-bottom: 0.5rem;
    text-align: center;
    padding-bottom: 10px;
    cursor: default;

    &.big {
      font-size: ${system.fontSizing.sm};
    }

    &.line {
      position: relative;
      width: 80%;
      border-bottom: 1px solid ${system.color.neutralDark};
      margin-bottom: 20px;
    }
  }
`
