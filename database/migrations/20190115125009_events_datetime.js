exports.up = knex => {
  return knex.schema.alterTable('events', table => {
    table.dropColumn('start_time')
    table.dropColumn('end_time')
    table.dropColumn('day')
    table.datetime('start')
    table.datetime('end')
  })
}

exports.down = knex => {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('end_time')
    table.dropColumn('start_time')
    table.integer('day').notNullable()
    table.integer('start_time')
    table.integer('end_time')
  })
}
