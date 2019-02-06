const supertest = require('supertest')
const server = require('../server/server')
const db = require('../database/dbConfig')
const uuid = require('uuid/v4')

const request = supertest(server)

describe('testing the invites router', () => {
  // both of the POST routes depend on the testing middleware
  // instad of needing pass a token to get the user id,
  // the testin middleware allows you to specify user type
  // without never needing to worry about generating a token
  describe('POST /invite-supervisor', () => {
    it('posts with correct auth and body', async () => {
      const response = await request
        .post('/invites/invite-supervisor')
        .send({
          name: 'Testing McTestyFace',
          email: 'test@testymctestyface.com'
        })
        .set('authorization', 'testing')
        .set('user', 'owner')

      expect(response.status).toEqual(201)
    })

    it('fails with incorrect auth', async () => {
      const response = await request
        .post('/invites/invite-supervisor')
        .send({
          name: 'Testing McTestyFace',
          email: 'test@testymctestyface.com'
        })
        .set('authorization', 'testing')
        .set('user', 'supervisor')

      expect(response.status).toEqual(403)
    })

    it('fails with incorrect body', async () => {
      const response = await request
        .post('/invites/invite-supervisor')
        .send({
          name: 'Testing McTestyFace',
          email2: 'test@testymctestyface.com'
        })
        .set('authorization', 'testing')
        .set('user', 'owner')

      expect(response.status).toEqual(400)
    })
  })

  describe('POST /invite-employee', () => {
    it('posts with correct auth and body', async () => {
      const response = await request
        .post('/invites/invite-employee')
        .send({
          name: 'Testing McTestyFace',
          email: 'test@testymctestyface.com'
        })
        .set('authorization', 'testing')
        .set('user', 'supervisor')

      expect(response.status).toEqual(201)
    })

    it('fails with incorrect auth', async () => {
      const response = await request
        .post('/invites/invite-employee')
        .send({
          name: 'Testing McTestyFace',
          email: 'test@testymctestyface.com'
        })
        .set('authorization', 'testing')
        .set('user', 'employee')

      expect(response.status).toEqual(403)
    })
  })

  describe('POST /register/:inviteId', async () => {
    it('succeeds with correct body and id', async () => {
      // grab some invite id
      const { id } = await db('invites').first()

      const response = await request
        .post(`/invites/register/${id}`)
        .send({
          firstName: 'Testy',
          lastName: 'McTestyface',
          email: 'test@testymctestyface.com',
          phone: '987098703295832'
        })
        .set('authorization', 'testing')
        .set('user', 'new_id')

      expect(response.status).toBe(201)
    })

    it('fails with incorrect body', async () => {
      // grab some invite id
      const { id } = await db('invites').first()

      const response = await request
        .post(`/invites/register/${id}`)
        .send({
          badData: true
        })
        .set('authorization', 'testing')
        .set('user', 'new_id')

      expect(response.status).toBe(400)
    })

    it('fails with incorrect id', async () => {
      const id = uuid()

      const response = await request
        .post(`/invites/register/${id}`)
        .send({
          firstName: 'Testy',
          lastName: 'McTestyface',
          email: 'test@testymctestyface.com',
          phone: '987098703295832'
        })
        .set('authorization', 'testing')
        .set('user', 'new_id')

      expect(response.status).toBe(500)
    })
  })
})
