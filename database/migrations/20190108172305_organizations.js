exports.up = knex =>
  knex.schema.createTable('organizations', table => {
    table
      .uuid('id')
      .primary()
      .notNullable()
    table.string('name', 128).notNullable()
    table.string('industry', 128)
  })

exports.down = knex => knex.schema.dropTableIfExists('organizations')
