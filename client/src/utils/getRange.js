import moment from 'moment'

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
