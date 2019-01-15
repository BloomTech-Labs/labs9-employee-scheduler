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
  return knex.schema.alterTable('events', table => {
    table.dropColumn('start')
    table.dropColumn('end')
    table
      .integer('day')
      .notNullable()
      .defaultTo(1)
    table.integer('start_time')
    table.integer('end_time')
  })
}
