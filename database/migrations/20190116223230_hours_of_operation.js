exports.up = knex =>
  knex.schema.createTable('hours_of_operation', table => {
    table.uuid('id').primary()
    table.integer('day').notNullable()
    table.float('open_time').defaultTo(9)
    table.float('close_time').defaultTo(17)
    table.boolean('closed').defaultTo(1)
    table
      .uuid('organization_id')
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })

exports.down = knex => knex.schema.dropTableIfExists('hours_of_operation')
