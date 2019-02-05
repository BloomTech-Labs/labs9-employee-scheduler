exports.up = knex =>
  knex.schema.createTable('users', table => {
    table
      .string('id', 50)
      .primary()
      .notNullable()
    table // people be in more than one organization? overoptimazation?
      .uuid('organization_id')
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.string('first_name', 128).notNullable()
    table.string('last_name', 128).notNullable()
    table.string('role', 128).notNullable() // enumerable datatype? foreigh key to table with all user roles?
    table.string('email')
    table.string('phone')
    table.boolean('cal_visit').defaultTo(true)
    table.boolean('emp_visit').defaultTo(true)
  })

exports.down = knex => knex.schema.dropTableIfExists('users')
