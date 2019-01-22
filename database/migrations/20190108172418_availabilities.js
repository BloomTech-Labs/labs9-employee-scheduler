exports.up = knex =>
  knex.schema.createTable('availabilities', table => {
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
    table.integer('day').notNullable() // 0-6 for Sunday-Saturday

    // for both below value is '0-23'
    table.integer('start_time')
    table.integer('end_time')
    table
      .boolean('off')
      .defaultTo(1)
      .notNullable()
  })

exports.down = knex => knex.schema.dropTableIfExists('availabilities')
