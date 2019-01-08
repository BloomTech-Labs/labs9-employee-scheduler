exports.up = knex =>
  knex.schema.createTable('time_off_requests', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
    table.date('date').notNullable()
    table.string('reason', 1024)
    table.string('status').defaultTo('pending')
  })

exports.down = knex => knex.schema.dropTableIfExists('time_off_requests')
