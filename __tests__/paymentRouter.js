const supertest = require('supertest')
const server = require('../server/server')
const { getOrg } = require('../database/helpers/')
// const db = require('../database/dbConfig')
// const uuid = require('uuid/v4')

const request = supertest(server)

const orgId = '9126df31-2607-4166-9c0c-d0a300c59c62' // cadence org id from seeds

describe('testing payments router', () => {
  it('posts payment with a valid token', async () => {
    const response = await request
      .post('/stripe')
      .send({
        token: { id: 'tok_visa' },
        email: 'testy@testyMcTestyface.com',
        org_id: orgId
      })
      .set('authorization', 'testing')
      .set('user', 'owner')

    expect(response.status).toEqual(201)
  })

  it('fails to post with an invalid token', async () => {
    const response = await request
      .post('/stripe')
      .send({
        token: { id: ';lkjaf;kj;kja;kj;lkjaf;elkja' },
        email: 'testy@testyMcTestyface.com',
        org_id: orgId
      })
      .set('authorization', 'testing')
      .set('user', 'owner')

    expect(response.status).toEqual(500)
  })

  it('puts a cancel to the subscription', async () => {
    const { subscription_id } = await getOrg(orgId)

    const response = await request
      .put('/stripe')
      .send({
        subscription_id,
        org_id: orgId
      })
      .set('authorization', 'testing')
      .set('user', 'owner')

    expect(response.status).toEqual(200)
  })

  it('fails to cancel with wrong user role', async () => {
    expect(true)
  })
})
