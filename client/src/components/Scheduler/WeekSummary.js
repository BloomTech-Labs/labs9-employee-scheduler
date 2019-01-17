import React from 'react'
import DailySummary from './DailySummary'
import styled from '@emotion/styled'
import system from '../../design/theme'

function sortFunction(a, b) {
  var dateA = new Date(a.day).getTime()
  var dateB = new Date(b.day).getTime()
  return dateA > dateB ? 1 : -1
}

Array.prototype.unique = function() {
  return this.filter(function(value, index, self) {
    return self.indexOf(value) === index
  })
}

export default function WeekSummary(props) {
  const { events } = props
  const eventsArr = []
  events.map(event => {
    event = {
      employee: event.title,
      day: event.start.toLocaleDateString('en-US', 'numeric'),
      hours: Math.abs(event.end - event.start) / 3600000
    }
    eventsArr.push(event)
  })
  const shifts = eventsArr.sort(sortFunction)

  const reduced = shifts.reduce((acc, current) => {
    const { employee, day, hours } = current
    const newItem = { employees: [employee], hours: hours }

    if (acc[day]) {
      acc[day] = {
        ...acc[day],
        day: acc[day],
        hours: acc[day].hours + newItem.hours,
        employees: acc[day].employees.concat(newItem.employees)
      }
    } else {
      acc[day] = newItem
    }

    return acc
  }, {})

  const days = Object.keys(reduced)
  const counts = Object.values(reduced)
  const summaries = []
  for (let i = 0; i < days.length; i++) {
    summaries[i] = {
      day: days[i],
      employees: counts[i].employees.unique().length,
      hours: counts[i].hours
    }
  }

  console.log(summaries)

  return (
    <Div>
      {summaries.map((summary, i) => (
        <DailySummary key={i} summary={summary} />
      ))}
    </Div>
  )
}

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 25px 25px 90px;
`
