exports.seed = knex =>
  knex('events')
    .truncate()
    .then(() => knex('events').insert([]))
