import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import styled from '@emotion/styled'
import system from '../design/theme'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

const localizer = BigCalendar.momentLocalizer(moment)

export default function Calendar(props) {
  return <StyledCalendar {...props} localizer />
}

const StyledCalendar = styled(BigCalendar)`
  width: 100%;
  padding: ${system.spacing.hugePadding};
`
