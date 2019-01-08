exports.up = knex =>
  knex.schema.createTable('events', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
    table.date('day').notNullable()
    table.time('start_time')
    table.time('end_time')
  })

exports.down = knex => knex.schema.dropTableIfExists('events')
