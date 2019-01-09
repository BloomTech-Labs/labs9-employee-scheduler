exports.up = knex =>
  knex.schema.createTable('users', table => {
    table
      .uuid('id')
      .primary()
      .notNullable()
    // create relationship between user and organization?
    // people be in more than one organization? overoptimazation?
    table.string('first_name', 128).notNullable()
    table.string('last_name', 128).notNullable()
    table.string('role', 128).notNullable() // enumerable datatype? foreigh key to table with all user roles?
    table.string('email')
    table.string('phone')
  })

exports.down = knex => knex.schema.dropTableIfExists('users')
