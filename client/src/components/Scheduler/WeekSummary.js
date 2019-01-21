import React from 'react'
import DailySummary from './DailySummary'
import styled from '@emotion/styled'
import moment from 'moment'

Array.prototype.unique = function() {
  return this.filter(function(value, index, self) {
    return self.indexOf(value) === index
  })
}

class WeekSummary extends React.Component {
  componentDidMount = () => {}

  sortFunction = (a, b) => {
    var dateA = new Date(a.day).getTime()
    var dateB = new Date(b.day).getTime()
    return dateA > dateB ? 1 : -1
  }

  rangeFilter = (events, range) => {
    console.log(range)
    let filtered = null
    if (Array.isArray(range) && range.length === 1) {
      filtered = events.filter(
        event =>
          event.start >= moment(range[0]).startOf('day') &&
          event.end <= moment(range[0]).endOf('day')
      )
    } else if (Array.isArray(range)) {
      filtered = events.filter(
        event =>
          event.start >= moment(range[0]).startOf('day') &&
          event.end <= moment(range[6]).endOf('day')
      )
    } else {
      console.log(events)
      filtered = events.filter(
        event => event.start >= range.start && event.end <= range.end
      )
    }
    return filtered
  }

  summarize = filtered => {
    const eventsArr = []
    const summaries = []
    filtered.map(event => {
      event = {
        employee: event.title,
        day: event.start.toLocaleDateString('en-US', 'numeric'),
        hours: Math.abs(event.end - event.start) / 3600000
      }
      eventsArr.push(event)
    })
    const shifts = eventsArr.sort(this.sortFunction)

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
    for (let i = 0; i < days.length; i++) {
      summaries[i] = {
        day: days[i],
        employees: counts[i].employees.unique().length,
        hours: counts[i].hours
      }
    }
    return summaries
  }

  render() {
    const { events, range } = this.props
    const filtered = this.rangeFilter(events, range)
    const summaries = this.summarize(filtered)
    console.log(summaries)
    return (
      <Div>
        {summaries
          ? summaries.map((summary, i) => (
              <DailySummary key={i} summary={summary} />
            ))
          : null}
      </Div>
    )
  }
}

export default WeekSummary

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 25px 25px 90px;
`
