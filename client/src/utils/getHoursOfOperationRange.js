import moment from 'moment'

export function getHoursOfOperationRange(hours) {
  let firstDay = hours.find(day => !day.closed)
  let range =
    !hours.length || !firstDay
      ? // make sure hours of operation have been received and there is
        // an open day, otherwise do full day range
        {
          min: moment().startOf('day'),
          max: moment().endOf('day')
        }
      : hours.reduce(
          (acc, day) => {
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
    max: range.max.toDate()
  }
}
