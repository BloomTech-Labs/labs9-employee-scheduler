exports.seed = knex =>
  knex('time_off_requests')
    .truncate()
    .then(() => knex('time_off_requests').insert([]))
