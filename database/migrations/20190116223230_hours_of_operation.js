exports.up = knex =>
  knex.schema.createTable('hours-of-operation', table => {
    table
      .uuid('organization_id', 100)
      .primary()
      .notNullable()
    table.string('day')
    table.integer('open_time')
    table.integer('close_time')
  })

exports.down = knex => knex.schema.dropTableIfExists('hours-of-operation')
