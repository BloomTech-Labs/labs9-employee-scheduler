function truncateDB(db) {
  return db.raw(
    'TRUNCATE "notesTagsJoin", notes, tags, users RESTART IDENTITY CASCADE'
  )
}
const processDateTime = date => {
  const { DB_ENV } = process.env
  if (DB_ENV === 'psql') {
    return new Date(date).toJSON()
  } else {
    return new Date(date).getTime()
  }
}

const processDate = date => {
  const { DB_ENV } = process.env
  if (DB_ENV === 'psql') {
    return new Date(date).toJSON()
  } else {
    return new Date(date).toJSON().split('T')[0]
  }
}

module.exports = { truncateDB, processDateTime, processDate }
