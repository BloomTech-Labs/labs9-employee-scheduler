exports.up = knex => {
  return knex.schema.alterTable('organizations', table => {
    table.boolean('paid').defaultTo(false)
    table.string('customer_id').unique()
    table.string('subscription_id').unique()
  })
}

exports.down = knex => {
  return knex.schema.alterTable('organizations', table => {
    table.dropColumn('paid')
    table.dropColumn('customer_id')
    table.dropColumn('subscription_id')
  })
}
