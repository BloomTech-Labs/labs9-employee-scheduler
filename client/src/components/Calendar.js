import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import styled from '@emotion/styled'
import system from '../design/theme'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

const localizer = BigCalendar.momentLocalizer(moment)

export default function Calendar(props) {
  const { names } = props
  const colors = ['#ed9a42', '#aa4465', '#00a5bf', '#4c723a', '#6d318c']
  let style = []
  for (let i = 0; i < names.length; i++) {
    console.log(`.${names[i]} {background: ${colors[i]};}`)
    style.push(`.${names[i]} {background: ${colors[i]};}`)
  }

  style = style.join(' ')
  console.log(style)

  return <StyledCalendar {...props} colors={style} localizer />
}

const StyledCalendar = styled(BigCalendar)`
  width: 100%;
  padding: ${system.spacing.hugePadding};

  ${props => props.colors} .rbc-event {
    border: 1px solid ${system.color.white};
  }

  .rbc-event-label {
    margin: 10px 0 0 7.5px;
  }

  .rbc-event-content {
    margin-left: 7.5px;
  }
`
