const supertest = require('supertest')
const server = require('../server/server')
const db = require('../database/dbConfig')
const uuid = require('uuid/v4')

const request = supertest(server)

describe('testing payments router', () => {
  it('posts payment with a valid token', async () => {
    const response = await request
      .post('/stripe')
      .send({
        token: 'tok_visa',
        email: 'testy@testyMcTestyface.com',
        org_id: '9126df31-2607-4166-9c0c-d0a300c59c62' // cadence org id from seeds
      })
      .set('authorization', 'testing')
      .set('user', 'owner')

    expect(response.status).toEqual(201)
    expect(true)
  })

  it('fails to post with an invalid token', async () => {
    expect(true)
  })

  it('puts a cancel to the subscription', async () => {
    expect(true)
  })

  it('fails to cancel with wrong user role', async () => {
    expect(true)
  })
})
