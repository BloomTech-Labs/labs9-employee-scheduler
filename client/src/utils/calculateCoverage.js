import moment from 'moment'

export const calculateCoverage = ({ hours, employees, view, date }) => {
  // Step 1: combine all shifts into a single array
  const shifts = employees.reduce((acc, { events }) => [...acc, ...events], [])

  // Step 2: filter/truncate shifts by view range
  // compute the beginning and end of the view range
  const rangeStart = moment(date).startOf(view)
  const rangeEnd = moment(date).endOf(view)

  // filter/truncate based on range vars
  const rangeFilteredShifts = shifts.reduce((acc, { start, end }) => {
    // ! (not sign) is necessary to create a >= or <= comparison
    if (!moment(rangeEnd).isAfter(start)) {
      // if shift start isn't within range, discard
      return [...acc]
    } else if (!moment(rangeStart).isBefore(end)) {
      // if shift end isn't within range, discard
      return [...acc]
    } else if (
      moment(start).isBefore(rangeStart) &&
      moment(end).isAfter(rangeEnd)
    ) {
      // if we need to truncate both start and end
      return [
        ...acc,
        {
          start: moment(rangeStart)
            .utc()
            .format(),
          end: moment(rangeEnd)
            .utc()
            .format()
        }
      ]
    } else if (moment(start).isBefore(rangeStart)) {
      // if we need to truncate just the start of the shift
      return [
        ...acc,
        {
          start: moment(rangeStart)
            .utc()
            .format(),
          end
        }
      ]
    } else if (moment(end).isAfter(rangeEnd)) {
      // if we need to truncate just the end of the shift
      return [
        ...acc,
        {
          start,
          end: moment(rangeEnd)
            .utc()
            .format()
        }
      ]
    } else {
      // otherwise do nothing (if shift falls entirely within range)
      return [...acc, { start, end }]
    }
  }, [])

  // Step 3: initialize a days object keyed by all open days on the schedule
  const days = hours.reduce(
    (acc, { day, closed }) => (!closed ? { ...acc, [day]: [] } : { ...acc }),
    {}
  )

  // Step 4: populate days object with all corresponding shifts
  rangeFilteredShifts.forEach(shift => {
    const shiftDay = moment(shift.start).day()
    if (days[shiftDay]) {
      days[shiftDay].push(shift)
    }
  })

  // Step 5: initialize covered and open hours variables
  let totalHoursCovered = 0
  let totalHoursOpen = 0

  // Step 6: if week view, calculate total hours open according to the schedule
  if (view === 'week') {
    totalHoursOpen = hours.reduce((acc, { open_time, close_time, closed }) => {
      if (!closed) {
        const convertTimeToObject = time => {
          const [hour, minute] = time.split(':')
          return { hour, minute, second: '00' }
        }

        let open = moment().set(convertTimeToObject(open_time))
        let close = moment().set(convertTimeToObject(close_time))

        if (moment(close).isBefore(open)) {
          close = close.add(1, 'days')
        }

        return acc + moment.duration(moment(close).diff(open)).asHours()
      } else {
        return acc
      }
    }, 0)
  }

  // Step 7: calculate shift coverage for each day and add to the total
  Object.keys(days).forEach(key => {
    // Step 7.1: sort shifts by start time (this is necessary to merge them properly)
    const sortedShifts = days[key].sort((a, b) => {
      if (moment(a.start).isAfter(b.start)) {
        return 1
      } else {
        return -1
      }
    })

    // Step 7.2: merge shifts (take shifts and combine them into blocks of time)
    const mergedShifts = sortedShifts.reduce((acc, { start, end }) => {
      if (!acc.length) {
        // start by initializing with first shift
        return [{ start, end }]
      } else {
        if (moment(start).isAfter(acc[acc.length - 1].end)) {
          // if shifts are not overlapping
          return [...acc, { start, end }]
        } else if (moment(end).isBefore(acc[acc.length - 1].end)) {
          // if new shift exists within previous block
          return [...acc]
        } else {
          // if we need to replace last block with a combined block
          return [
            ...acc.slice(0, acc.length - 1),
            { start: acc[acc.length - 1].start, end }
          ]
        }
      }
    }, [])

    // Step 7.3: initialize hours open variable (this is necessary for day view)
    let hoursOpen = 0

    // Step 7.4: truncate merged shifts to only open hours
    const truncatedShifts = mergedShifts.reduce((acc, { start, end }) => {
      // Step 7.4.1: calculate the hours open for the day that a shift takes place
      const startDate = moment(start)
        .utc()
        .format('YYYY-MM-DD')

      let utcScheduleStart = moment(`${startDate}Z ${hours[key].open_time}:00`)
      let utcScheduleEnd = moment(`${startDate}Z ${hours[key].close_time}:00`)

      if (moment(utcScheduleEnd).isBefore(utcScheduleStart)) {
        utcScheduleEnd = utcScheduleEnd.add(1, 'days')
      }

      hoursOpen = moment
        .duration(moment(utcScheduleEnd).diff(utcScheduleStart))
        .asHours()

      // Step 7.4.2: run truncation logic

      // if schedule end is before shift start, discard shift
      // if schedule start is after shift end, discard shift
      // if shift start is before schedule start and if shift end is after end,
      //    truncate both shift start and shift end
      // if shift start is before schedule start, truncate shift start
      // if shift end is after end, trucate shift end
      // otherwise do nothing

      // `!` (not sign) necessary in comparisons where it appears
      if (!moment(utcScheduleEnd).isAfter(start)) {
        return [...acc]
      } else if (!moment(utcScheduleStart).isBefore(end)) {
        return [...acc]
      } else if (
        moment(start).isBefore(utcScheduleStart) &&
        moment(end).isAfter(utcScheduleEnd)
      ) {
        return [
          ...acc,
          {
            start: moment(utcScheduleStart)
              .utc()
              .format(),
            end: moment(utcScheduleEnd)
              .utc()
              .format()
          }
        ]
      } else if (moment(start).isBefore(utcScheduleStart)) {
        return [
          ...acc,
          {
            start: moment(utcScheduleStart)
              .utc()
              .format(),
            end
          }
        ]
      } else if (moment(end).isAfter(utcScheduleEnd)) {
        return [
          ...acc,
          {
            start,
            end: moment(utcScheduleEnd)
              .utc()
              .format()
          }
        ]
      } else {
        return [...acc, { start, end }]
      }
    }, [])

    // Step 7.5: calculate shift coverage in hours
    const hoursCovered = truncatedShifts.reduce((acc, { start, end }) => {
      return acc + moment.duration(moment(end).diff(start)).asHours()
    }, 0)

    // Step 7.6: increment the weekly totals accordingly
    totalHoursCovered += hoursCovered
    // only increment the hours open counter if in day view mode
    if (view === 'day') {
      totalHoursOpen += hoursOpen
    }
  })

  // Step 8: calculate coverage percentage
  const percentCoverage = Math.floor((totalHoursCovered / totalHoursOpen) * 100)

  // Step 9: return
  return percentCoverage
}
