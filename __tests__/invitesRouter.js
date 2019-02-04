const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const uuid = require('uuid/v4')
const {} = require('../database/utils/generateData')

const request = supertest(server)

describe('testing the invites router', () => {
  describe('POST /invite-supervisor', () => {
    it('posts with correct auth and body', async () => {
      // logic
      // sample logic follows:
      // const { team, cleanup } = await generateTeamData(knex)
      // const { id } = team.organization

      // const expected = await knex('organizations').where({
      //   id: id
      // })

      // const response = await request
      //   .get(`/organizations/${id}`)
      //   .set('authorization', 'testing')

      // expect(response.status).toEqual(200)
      // expect([response.body]).toEqual(expected)

      // await cleanup()
    })

    it('fails with incorrect auth', async () => {
      // logic
    })

    it('fails with incorrect body', async () => {
      // logic
    })
  })

  describe('POST /invite-employee', () => {
    it('posts with correct auth and body', async () => {
      // logic
    })

    it('fails with incorrect auth', async () => {
      // logic
    })

    it('fails with incorrect body', async () => {
      // logic
    })
  })

  describe('POST /register/:inviteId', () => {
    it('succeeds with correct body and id', async () => {
      // logc
    })

    it('fails with incorrect body', async () => {
      // logic
    })

    it('fails with incorrect id', async () => {
      // logic
    })it('posts with correct auth and body', async () => {
      // logic
    })

    it('fails with incorrect auth', async () => {
      // logic
    })

    it('fails with incorrect body', async () => {
      // logic
    })
  })
})


