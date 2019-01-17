//There is way more tables than there needs to be, it was made like this so I could use the seed for orgs.
exports.up = knex =>
  knex.schema.createTable('hours_of_operation', table => {
    table.uuid('id').primary()
    table.float('day') //should be notNullable but the seed is missing this for now
    table.float('open_time') //should be notNullable but the seed is missing this for now
    table.float('close_time') //should be notNullable but the seed is missing this for now
    table.boolean('closed')
    table
      .uuid('organization_id')
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })

exports.down = knex => knex.schema.dropTableIfExists('hours_of_operation')
