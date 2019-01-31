import moment from 'moment'

export const calculateCoverage = ({ hours, employees, view, date }) => {
  // combine all shifts into a single array
  const shifts = employees.reduce((acc, { events }) => [...acc, ...events], [])

  // console.log(view)
  // console.log(date)
  // console.log(shifts)

  const rangeStart = moment(date).startOf(view)
  const rangeEnd = moment(date).endOf(view)

  // console.log(rangeStart)
  // console.log(rangeEnd)

  // the logic for this fuction is duplicated later on and should be abstracted into separate func
  const rangeFilteredShifts = shifts.reduce((acc, { start, end }) => {
    if (!moment(rangeEnd).isAfter(start)) {
      return [...acc]
    } else if (!moment(rangeStart).isBefore(end)) {
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
      // otherwise do nothing
      return [...acc, { start, end }]
    }
  }, [])

  // initialize an object keyed by all open days on the schedule
  const days = hours.reduce(
    (acc, { day, closed }) => (!closed ? { ...acc, [day]: [] } : { ...acc }),
    {}
  )

  // console.log(hours)
  // console.log(days)

  // console.log(hours)
  // console.log(days)

  // populate days object with all corresponding shifts
  rangeFilteredShifts.forEach(shift => {
    const shiftDay = moment(shift.start).day()
    // console.log('DAY INFO')
    // console.log(moment(shift.start).day())
    // console.log(`day of the week: ${shiftDay}`)
    if (days[shiftDay]) {
      days[shiftDay].push(shift)
    }
  })

  // console.log('DAYS')
  // console.log(days)

  // initialize covered and open hours variables
  let totalHoursCovered = 0
  let totalHoursOpen = 0

  // calc hours open
  // some bug is causing this to have some strange tiny aberations in the num
  // letting it be for now
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

  // for each day add number of covered and open hours
  Object.keys(days).forEach(key => {
    // console.log(`Generating hours for ${key}`)
    // sort shifts by start time
    // console.log('ALL SHIFTS')
    // console.log(days[key])

    const sortedShifts = days[key].sort((a, b) => {
      if (moment(a.start).isAfter(b.start)) {
        return 1
      } else {
        return -1
      }
    })

    // console.log('SORTED SHIFTS:')
    // console.log(sortedShifts)

    // merge shifts
    // take shifts and combine them into blocks of time
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

    // console.log('MERGED SHIFTS')
    // console.log(mergedShifts)

    // initialize hours open variable
    let hoursOpen = 0

    // truncate merged shifts to only open hours
    const truncatedShifts = mergedShifts.reduce((acc, { start, end }) => {
      // if schedule end is before shift start, discard shift
      // if schedule start is after shift end, discard shift
      // if shift start is before schedule start and if shift end is after end,
      //    truncate both shift start and shift end
      // if shift start is before schedule start, truncate shift start
      // if shift end is after end, trucate shift end
      // otherwise do nothing

      const startDate = moment(start)
        .utc()
        .format('YYYY-MM-DD')

      let utcScheduleStart = moment(`${startDate}Z ${hours[key].open_time}:00`)
      let utcScheduleEnd = moment(`${startDate}Z ${hours[key].close_time}:00`)

      if (moment(utcScheduleEnd).isBefore(utcScheduleStart)) {
        utcScheduleEnd = utcScheduleEnd.add(1, 'days')
      }

      // console.log(utcScheduleStart.utc().format())
      // console.log(utcScheduleEnd.utc().format())

      // increment hours open appropriately
      // calculating in case the view is for a day
      hoursOpen = moment
        .duration(moment(utcScheduleEnd).diff(utcScheduleStart))
        .asHours()

      // run discard options first, then mutation options to make sure discards happen
      // `!` (not sign) necessary in comparisons where it appears
      if (!moment(utcScheduleEnd).isAfter(start)) {
        // console.log('discarding shift')
        return [...acc]
      } else if (!moment(utcScheduleStart).isBefore(end)) {
        // console.log('discarding shift')
        return [...acc]
      } else if (
        moment(start).isBefore(utcScheduleStart) &&
        moment(end).isAfter(utcScheduleEnd)
      ) {
        // if we need to truncate both start and end
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
        // otherwise do nothing
        return [...acc, { start, end }]
      }
    }, [])

    // console.log('TRUNCATED SHIFTS:')
    // console.log(truncatedShifts)

    // calculate shift coverage in hours
    const hoursCovered = truncatedShifts.reduce((acc, { start, end }) => {
      return acc + moment.duration(moment(end).diff(start)).asHours()
    }, 0)

    // console.log('HOURS COVERED:')
    // console.log(hoursCovered)

    // increment the weekly totals accordingly
    totalHoursCovered += hoursCovered
    if (view === 'day') {
      totalHoursOpen += hoursOpen
    }
  })

  // console.log(totalHoursCovered)
  // console.log(totalHoursOpen)

  // calculate percentage
  const percentCoverage = Math.floor((totalHoursCovered / totalHoursOpen) * 100)

  return percentCoverage
}
