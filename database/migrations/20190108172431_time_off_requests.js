exports.up = knex =>
  knex.schema.createTable('time_off_requests', table => {
    table
      .uuid('id')
      .primary()
      .notNullable()
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.date('date').notNullable()
    table.string('reason', 1024)
    table.string('status').defaultTo('pending') // change this to enumerable?
  })

exports.down = knex => knex.schema.dropTableIfExists('time_off_requests')
