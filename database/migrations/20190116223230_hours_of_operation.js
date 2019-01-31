exports.up = knex =>
  knex.schema.createTable('hours_of_operation', table => {
    table.uuid('id').primary()
    table.integer('day').notNullable()
    table.time('open_time')
    table.time('close_time')
    table.boolean('closed').defaultTo(false)
    table
      .uuid('organization_id')
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })

exports.down = knex => knex.schema.dropTableIfExists('hours_of_operation')
