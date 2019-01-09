exports.seed = knex =>
  knex('users')
    .truncate()
    .then(() => knex('users').insert([]))
