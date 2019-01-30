const db = require('../dbConfig')

db('availabilities')
  .then(res => {
    console.log(res.filter(avail => avail.user_id === res[20].user_id))
    return db('events').where('user_id', res[20].user_id)
  })
  .then(res => {
    console.log(res)
    return db.destroy()
  })
