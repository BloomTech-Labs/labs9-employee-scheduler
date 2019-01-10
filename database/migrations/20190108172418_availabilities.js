exports.up = knex =>
  knex.schema.createTable('availabilities', table => {
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
    table.integer('day').notNullable() // 0-6 for Sunday-Saturday

    // for both below value is '0-23'
    table.integer('start_time')
    table.integer('end_time')
  })

exports.down = knex => knex.schema.dropTableIfExists('availabilities')
