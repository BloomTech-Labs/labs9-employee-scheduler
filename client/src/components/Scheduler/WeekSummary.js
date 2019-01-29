import React from 'react'
import DailySummary from './DailySummary'
import styled from '@emotion/styled'
import moment from 'moment'

class WeekSummary extends React.Component {
  filterAndSummarize = (events, range) => {
    // filter only events within the range
    let filtered =
      Array.isArray(range) && range.length === 1
        ? events.filter(
            event =>
              event.start >= moment(range[0]).startOf('day') &&
              event.end <= moment(range[0]).endOf('day')
          )
        : events.filter(
            event =>
              event.start >= moment(range[0]).startOf('day') &&
              event.end <= moment(range[6]).endOf('day')
          )

    const dayValues = filtered
      // compose events consumable structures
      .map(event => {
        return {
          employee: event.title,
          day: event.start.toLocaleDateString('en-US', 'numeric'),
          hours: Math.abs(event.end - event.start) / 3600000
        }
      })
      // build up hash table of days
      .reduce((acc, current) => {
        const { employee, day, hours } = current
        const newItem = { employees: new Set([employee]), hours, day }

        if (acc[day]) {
          acc[day] = {
            hours: acc[day].hours + newItem.hours,
            employees: new Set([...acc[day].employees, employee])
          }
        } else {
          acc[day] = newItem
        }

        return acc
      }, {})

    // use the dayValues to build up the range into usable stats objects
    let rangeStats = range.map(day => {
      const dayName = day.toLocaleDateString('en-US', 'numeric')
      const dayStats = dayValues[dayName]
      if (dayStats) {
        return {
          ...dayStats,
          day: dayName,
          employees: dayStats.employees.size
        }
      } else {
        return {
          day: dayName,
          hours: 0,
          employees: 0
        }
      }
    })
    return rangeStats
  }

  render() {
    const { events, range } = this.props
    let summaries = this.filterAndSummarize(events, range)

    return (
      <Div>
        <LeftSpacer />
        {summaries
          ? summaries.map((summary, i) => (
              <Spacer key={summary.day}>
                <DailySummary summary={summary} />
              </Spacer>
            ))
          : null}
      </Div>
    )
  }
}

export default WeekSummary

const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 40px 30px;
`

const LeftSpacer = styled.div`
  width: 56px;
`
const Spacer = styled.div`
  flex: 1 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5%;
`
