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
