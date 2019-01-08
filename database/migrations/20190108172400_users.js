exports.up = knex =>
  knex.schema.createTable('users', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('first_name', 128).notNullable()
    table.string('last_name', 128).notNullable()
    table.string('role', 128).notNullable()
    table.string('email')
    table.string('phone')
  })

exports.down = knex => knex.schema.dropTableIfExists('users')
