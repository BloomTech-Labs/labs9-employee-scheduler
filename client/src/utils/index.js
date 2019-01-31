import moment from 'moment'

export function getHoursOfOperationRange(hours) {
  let firstDay = hours.find(day => !day.closed)
  let range =
    // temporary change to prevent this from breaking
    // going to return min 0 max 24 no matter what
    // the hours of operation format has changed, which requires a lot of logic changes
    // i'll leaving this functionality to fix later
    !hours.length || !firstDay
      ? // make sure hours of operation have been received and there is
        // an open day, otherwise do full day range
        {
          min: moment().startOf('day'),
          max: moment().endOf('day')
        }
      : hours.reduce(
          (acc, day) => {
            // console.log(acc, day)
            let returnVal = { ...acc }
            const dayStart = moment.utc(day.open_time, 'HH:mm')
            const dayEnd = moment.utc(day.close_time, 'HH:mm')

            if (day.closed) {
              return returnVal
            }
            if (dayStart.isBefore(acc.min)) {
              returnVal.min = dayStart
            }
            if (dayEnd.isAfter(acc.max)) {
              returnVal.max = dayEnd
            }
            return returnVal
          },
          {
            min: moment.utc(firstDay.open_time, 'HH:mm'),
            max: moment.utc(firstDay.close_time, 'HH:mm')
          }
        )
  return {
    min: range.min.toDate(),
    max: range.max
      .subtract(1, 'minute')
      .endOf('hour')
      .toDate()
  }
}

export const formatHours = hours => {
  return moment
    .utc(hours, 'HH:mm')
    .local()
    .format('h:mm a')
}

const inRolloverZone = startTime => {
  const offset = Math.abs(moment().utcOffset())
  const date = moment(startTime, 'HH:mm')
  return date.hours() * 60 + date.minutes() < offset
}

// decrements a day by one, and wraps around to 6 for -1
const decrementDay = day => {
  const candidate = day - 1
  return candidate < 0 ? candidate + 7 : candidate
}

export const utcDayToLocal = ({ day, time }) => {
  return inRolloverZone(time) ? decrementDay(day) : day
}

export const localDayToUTC = ({ day, utcTime }) => {
  return inRolloverZone(utcTime) ? day + 1 : day
}

export const getRange = ({ date, view }) => {
  if (view === 'day') {
    return [date]
  } else {
    let range = []
    let inc = 1000 * 60 * 60 * 24
    let amount = 7
    let weekStart = moment(date).startOf('week')
    for (let i = 0; i < amount; i++) {
      range.push(new Date(weekStart + i * inc))
    }
    return range
  }
}

// helpers for calculateCoverage

// UTILS:
// converts a moment into float
export const convertMomentToFloat = time =>
  moment(time).hours() + moment(time).minutes() / 60

// converts a float into an object with hours and minutes
const convertFloatToTime = num => {
  const [hours, fraction] = num.toString().split('.')
  const minutes = parseInt((60 * (fraction / 10)).toString().slice(0, 2)) || 0
  return [hours, minutes]
}

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

export const validateShift = ({ eventTimes, hours, employee }) => {
  // step 1
  // check for conflicts with approved day off requests
  let conflicts = false

  employee.time_off_requests.forEach(({ start, end, status }) => {
    if (
      status === 'approved' &&
      (moment(start).isBetween(eventTimes.start, eventTimes.end) ||
        moment(end).isBetween(eventTimes.start, eventTimes.end))
    ) {
      conflicts = true
    }
  })

  if (conflicts) {
    return {
      verdict: false,
      message: `Sorry, you can't schedule this employee during their approved time off.`
    }
  }

  // step 2
  // check for the event falling inside an availability window
  const availabilityForDay = employee.availabilities.find(
    ({ day }) =>
      day ===
      moment(eventTimes.start)
        .utc()
        .day()
  )

  if (!availabilityForDay.off) {
    const convertTimeToObject = time => {
      const [hour, minute] = time.split(':')
      return { hour, minute, second: '00' }
    }

    let start = moment(eventTimes.start)
      .utc()
      .set(convertTimeToObject(availabilityForDay.start_time))
    let end = moment(eventTimes.start)
      .utc()
      .set(convertTimeToObject(availabilityForDay.end_time))

    if (moment(end).isBefore(start)) {
      end = end.add(1, 'days')
    }

    if (
      moment(start).isAfter(eventTimes.start) ||
      moment(end).isBefore(eventTimes.end)
    ) {
      return {
        verdict: false,
        message: `Sorry, you can't schedule this employee outside their availability window.`
      }
    }
  } else {
    return {
      verdict: false,
      message: `Sorry, the employee you're trying to schedule isn't available on this day.`
    }
  }

  // step 3
  // check for event falling outside hours of operation
  const day = moment(eventTimes.start)
    .utc()
    .day()

  if (hours[day].closed) {
    return {
      verdict: false,
      message: `Sorry, you can't schedule this employee outside the hours of operation.`
    }
  }

  const convertTimeToObject = time => {
    const [hour, minute] = time.split(':')
    return { hour, minute, second: '00' }
  }

  let scheduleStart = moment(eventTimes.start)
    .utc()
    .set(convertTimeToObject(hours[day].open_time))
  let scheduleEnd = moment(eventTimes.start)
    .utc()
    .set(convertTimeToObject(hours[day].close_time))

  if (moment(scheduleEnd).isBefore(scheduleStart)) {
    scheduleEnd = scheduleEnd.add(1, 'days')
  }

  if (
    !moment(eventTimes.start).isBetween(
      scheduleStart,
      scheduleEnd,
      'minute',
      [] /*inclusive*/
    ) ||
    !moment(eventTimes.end).isBetween(
      scheduleStart,
      scheduleEnd,
      'minute',
      [] /*inclusive*/
    )
  ) {
    return {
      verdict: false,
      message: `Sorry, you can't schedule this employee outside the hours of operation.`
    }
  }

  // step 4
  // check for scheduling the same employee twice during the same block of time
  // employee.events.forEach(({ start, end }) => {
  //   // possible collisions: if event start or end exists between start/end of existsing event
  //   if (
  //     (moment(eventTimes.start).isAfter(start) &&
  //       moment(eventTimes.start).isBefore(end)) ||
  //     (moment(eventTimes.end).isAfter(start) &&
  //       moment(eventTimes.end).isBefore(end))
  //   ) {
  //     conflicts = true
  //   }
  // })

  // need to keep this separate because returning from forEach doesn't escape the enclosing func
  if (conflicts) {
    return {
      verdict: false,
      message: `Sorry, you can't schedule this employee twice during the same block of time.`
    }
  }

  // if everything went okay
  return { verdict: true }
}

// slider time helpers
export const minuteToTime = (value, format = 12) => {
  value = value > 1439 ? 1439 : value
  let hours = Math.floor(value / 60),
    minutes = value - hours * 60,
    ampm
  if (format === 12) {
    ampm = 'AM'
    if (hours >= 12) {
      if (hours !== 12) {
        hours = hours - 12
      }
      ampm = 'PM'
    }
    if (hours === 0) {
      hours = 12
    }
  }

  return { hours: hours, minutes: minutes, am_pm: ampm }
}

export const timeToMinute = (time, format = 12) => {
  let rMinutes = 1439
  if (format === 24) {
    time = time.split(':')
    if (time.length < 2) {
      throw new Error('Invalid time')
    }
    let hours = time[0],
      minutes = parseInt(time[1])
    hours = parseInt(hours * 60)
    rMinutes = hours + minutes
  } else {
    time = time.toUpperCase()
    time = time.replace(' ', '')
    let ampm = time.indexOf('AM') !== -1 ? 'AM' : 'PM'
    time = time.replace(ampm, '')
    time = time.split(':')
    if (time.length < 2) {
      throw new Error('Invalid time')
    }
    let hours = parseInt(time[0]),
      minutes = parseInt(time[1])
    if (ampm === 'PM') {
      if (hours !== 12) {
        hours = hours + 12
      }
    } else {
      hours = hours === 12 ? 0 : hours
    }
    hours = hours * 60
    rMinutes = hours + minutes
  }
  return rMinutes > 1439 ? 1439 : rMinutes
}
