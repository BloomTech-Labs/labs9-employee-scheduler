exports.seed = knex =>
  knex('availabilities')
    .truncate()
    .then(() => knex('availabilities').insert([]))
