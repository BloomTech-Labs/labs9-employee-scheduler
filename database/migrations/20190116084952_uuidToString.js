exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable('availabilities', table => table.dropColumn('user_id'))
    .then(() =>
      knex.schema.alterTable('time_off_requests', table =>
        table.dropColumn('user_id')
      )
    )
    .then(() =>
      knex.schema.alterTable('events', table => table.dropColumn('user_id'))
    )
    .then(() =>
      knex.schema.alterTable('users', table => table.dropColumn('id'))
    )
    .then(() =>
      knex.schema.alterTable('users', table => table.string('id', 50))
    )
    .then(() =>
      knex.schema.alterTable('events', table =>
        table
          .string('user_id', 50)
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
      )
    )
    .then(() =>
      knex.schema.alterTable('time_off_requests', table =>
        table
          .string('user_id', 50)
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
      )
    )
    .then(() =>
      knex.schema.alterTable('availabilities', table =>
        table
          .string('user_id', 50)
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
      )
    )
}

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable('availabilities', table => table.dropColumn('user_id'))
    .then(() =>
      knex.schema.alterTable('time_off_requests', table =>
        table.dropColumn('user_id')
      )
    )
    .then(() =>
      knex.schema.alterTable('events', table => table.dropColumn('user_id'))
    )
    .then(() =>
      knex.schema.alterTable('users', table => table.dropColumn('id'))
    )
    .then(() => knex.schema.alterTable('users', table => table.uuid('id')))
    .then(() =>
      knex.schema.alterTable('events', table =>
        table
          .uuid('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
      )
    )
    .then(() =>
      knex.schema.alterTable('time_off_requests', table =>
        table
          .uuid('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
      )
    )
    .then(() =>
      knex.schema.alterTable('availabilities', table =>
        table
          .uuid('user_id', 50)
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
      )
    )
}
