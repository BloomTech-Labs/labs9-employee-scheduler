exports.seed = knex =>
  knex('organizations')
    .truncate()
    .then(() => knex('organizations').insert([]))
