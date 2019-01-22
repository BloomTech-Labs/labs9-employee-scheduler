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

  filterAndSummarize = (events, range) => {
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
      filtered = events.filter(
        event => event.start >= range.start && event.end <= range.end
      )
    }
    const eventsArr = []
    const summaries = []
    filtered.forEach(event => {
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

    if (Array.isArray(range) && range.length > 1) {
      // we want to check whether the summaries contain the range dates. If not, we want to push the empty dates.
      let check = []

      // populating the check array with the correctly formatted dates.
      summaries.forEach(summary => {
        check.push(summary.day)
      })

      // mapping the range into the right format, filtering for uniques (i.e. not present in the check array), and push into summaries
      range
        .map(item => item.toLocaleDateString('en-US', 'numeric'))
        .filter(function(obj) {
          return check.indexOf(obj) == -1
        })
        .forEach(unique => {
          summaries.push({ day: unique, hours: 0, employees: 0 })
        })
      return summaries.sort(this.sortFunction)
    } else {
      return summaries
    }
  }

  render() {
    const { events, range } = this.props
    let summaries = this.filterAndSummarize(events, range)
    return (
      <Div>
        {summaries
          ? summaries.map((summary, i) => (
              <DailySummary key={summary.day} summary={summary} />
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
