const { generateAllHoursOfOperation } = require('../utils/generateData')
const ids = require('../ids.json').org_ids
const hours = generateAllHoursOfOperation(ids)

exports.seed = knex =>
  knex('hours_of_operation')
    .delete()
    .then(() => knex('hours_of_operation').insert(hours))
