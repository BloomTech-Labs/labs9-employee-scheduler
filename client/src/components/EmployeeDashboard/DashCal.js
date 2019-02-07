import React from 'react'
import Calendar from '../common/Calendar'
import styled from '@emotion/styled'
import lines from '../../assets/img/lines.svg'
import PropTypes from 'prop-types'

export default function DashCal(props) {
  const { events, names, min, max, view, eventPropGetter, date } = props

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
    <div id="calendar">
      <StyledCal
        colors={style.join(' ')}
        events={events}
        names={names}
        min={min}
        max={max}
        view={view}
        eventPropGetter={eventPropGetter}
        date={date}
        onView={() => {}}
        onNavigate={() => {}}
      />
    </div>
  )
}

DashCal.propTypes = {
  color: PropTypes.arrayOf(PropTypes.string),
  event: PropTypes.object,
  names: PropTypes.array.isRequired,
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  eventPropGetter: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  onView: PropTypes.func,
  onNavigate: PropTypes.func
}

const StyledCal = styled(Calendar)`
  .rbc-event {
    cursor: default;
  }
`
