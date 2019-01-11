const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { generateTeamData } = require('../database/utils/generateData')

const request = supertest(server)

describe('testing the organizations router', () => {
  describe('GET', () => {
    it('returns all organizations - GET /', async () => {
      const expected = await knex('organizations')
      const response = await request.get('/organizations')

      expect(response.status).toEqual(200)
      expect(response.body.length).toEqual(expected.length)
    })
  })

  describe('GET /:id', () => {
    it('returns the correct organization by ID - GET /:id', async () => {
      const { team, cleanup } = await generateTeamData(knex)
      const { id } = team.organization

      const expected = await knex('organizations').where({
        id: id
      })

      const response = await request.get(`/organizations/${id}`)

      expect(response.status).toEqual(200)
      expect(response.body.length).toEqual(expected.length)

      await cleanup()
    })

    it('returns status code 404 for non-existent organization - GET/:id', async () => {})
  })
})
