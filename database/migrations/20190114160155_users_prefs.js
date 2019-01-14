exports.up = knex => {
  return knex.schema.alterTable('users', table => {
    table.boolean('emailpref')
    table.boolean('phonepref')
  })
}

exports.down = knex => {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('emailpref')
    table.dropColumn('phonepref')
  })
}
