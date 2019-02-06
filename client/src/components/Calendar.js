import React from 'react'
import BigCalendar from 'cadence-big-calendar'
import moment from 'moment'
import styled from '@emotion/styled'
import system from '../design/theme'

import 'cadence-big-calendar/lib/css/react-big-calendar.css'
import 'cadence-big-calendar/lib/addons/dragAndDrop/styles.css'

const localizer = BigCalendar.momentLocalizer(moment)

export default function Calendar(props) {
  const { names } = props
  const colors = [
    '#E91E63',
    '#3F51B5',
    '#ff7473',
    '#79bd9a',
    '#8F2D56',
    '#C89EC4',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#00695C',
    '#D84315',
    '#FFC107',
    '#FF5722',
    '#AD1457',
    '#6200EA',
    '#2962FF',
    '#00838F',
    '#FF8F00',
    '#558B2F'
  ]
  let style = []
  for (let i = 0; i < names.length; i++) {
    style.push(`.${names[i]} {background: ${colors[i]};}`)
  }

  return (
    <StyledCalendar
      colors={style.join(' ')}
      localizer={localizer}
      views={['week', 'day']}
      step={30}
      {...props}
      showMultiDayTimes={true}
    />
  )
}

const StyledCalendar = styled(BigCalendar)`
  width: 100%;
  height: 100%;
  padding: ${system.spacing.hugePadding} ${system.spacing.hugePadding} 10px;

  ${props => props.colors} .rbc-event {
    border: 0.75px solid ${system.color.bodytext} !important;
  }

  @media ${system.breakpoints[0]} {
    padding: ${system.spacing.hugePadding} 0;
  }

  .rbc-toolbar-label {
    font-family: 'Lato', sans-serif;
    font-size: ${system.fontSizing.m};
    margin-bottom: 10px;
  }

  .rbc-event-label {
    margin: 10px 0 0 7.5px;
  }

  .rbc-event-content {
    margin-left: 7.5px;
  }

  .rbc-header {
    padding-top: 5px;
  }

  .rbc-btn-group {
    display: none;
  }

  .rbc-allday-cell {
    display: none;
  }
  .rbc-time-view .rbc-header {
    border-bottom: none;
  }

  .rbc-time-view {
    background: ${system.color.white};
    margin: 1px;
    border-radius: ${system.borders.bigRadius};
  }

  /* the below makes the Agenda view normally colored instead of the same color as events */
  table,
  tr,
  td {
    background: transparent !important;
  }
`
