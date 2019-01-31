exports.up = knex =>
  knex.schema.createTable('time_off_requests', table => {
    table
      .uuid('id')
      .primary()
      .notNullable()
    table
      .string('user_id', 50)
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.datetime('start').notNullable()
    table.datetime('end').notNullable()
    table.string('reason', 1024)
    table.string('status').defaultTo('pending') // change this to enumerable?
  })

exports.down = knex => knex.schema.dropTableIfExists('time_off_requests')
