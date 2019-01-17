exports.up = knex =>
  knex.schema.createTable('hours-of-operation', table => {
    table
      .uuid('organization_id')
      .primary()
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.string('day').notNullable()
    table.integer('open_time').notNullable()
    table.integer('close_time').notNullable()
  })

exports.down = knex => knex.schema.dropTableIfExists('hours-of-operation')
