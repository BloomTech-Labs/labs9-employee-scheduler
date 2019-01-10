const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { populateOrg, insertOrg } = require('../database/utils/generateData')

const request = supertest(server)

describe('user endpoint', () => {
  let org
  beforeEach(async () => {
    if (org) {
      await knex.delete({ id: org.organization.id })
    }
    org = populateOrg()
    await insertOrg(org, knex)
  })

  afterAll(async () => {
    if (org) {
      await knex.delete({ id: org.organization.id })
    }
  })

  // it('returns all users GET /', async () => {
  //   console.log('running')
  //   const expected = await knex('users')

  //   const response = await request.get('/users')

  //   expect(response.status).toEqual(200)
  //   expect(response.body.length).toEqual(expected.length)
  // })

  it('returns all users for an org', async () => {
    console.log('running')
    const { id } = org.organization
    const expected = await knex('users').where({
      organization_id: id
    })

    const response = await request.get(`/users/${id}`)

    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(expected.length)
  })
})
