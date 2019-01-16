const { generateOrgs } = require('../utils/generateData')
const ids = require('../ids.json').org_ids

const organizations = generateOrgs(ids)

exports.seed = knex =>
  knex('organizations')
    .delete()
    .then(() => knex('organizations').insert(organizations))
