const processDateTime = date => {
  return new Date(date).toJSON()
}

const processDate = date => {
  return new Date(date).toJSON()
}

module.exports = { processDateTime, processDate }
