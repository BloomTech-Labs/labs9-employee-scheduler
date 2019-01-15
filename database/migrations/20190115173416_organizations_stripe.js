exports.up = knex => {
  return knex.schema.alterTable('organizations', table => {
    table.boolean('paid')
    table.string('customer_id').unique()
  })
}

exports.down = knex => {
  return knex.schema.alterTable('organizations', table => {
    table.dropColumn('paid')
    table.dropColumn('customer_id')
  })
}
