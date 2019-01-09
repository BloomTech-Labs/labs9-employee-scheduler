exports.up = knex =>
  knex.schema.createTable('events', table => {
    table
      .uuid('id')
      .primary()
      .notNullable()
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
    table.date('day').notNullable()
    table.integer('start_time')
    table.integer('end_time')
  })

exports.down = knex => knex.schema.dropTableIfExists('events')
