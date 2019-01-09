const faker = require('faker')
const ids = require('../ids.json').org_ids

const organizations = ids.map(id => ({
  id,
  name: faker.company.companyName(),
  description: faker.lorem.sentence()
}))

exports.seed = knex =>
  knex('organizations')
    .truncate()
    .then(() => knex('organizations').insert(organizations))
