exports.up = knex =>
  knex.schema.createTable('hours_of_operation', table => {
    table.uuid('id').primary()
    table.integer('day').notNullable()
    table
      .float('open_time')
      .notNullable()
      .defaultTo(8)
    table
      .float('close_time')
      .notNullable()
      .defaultTo(16)

    table.boolean('closed')
    table
      .uuid('organization_id')
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })

exports.down = knex => knex.schema.dropTableIfExists('hours_of_operation')
