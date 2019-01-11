const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { generateTeamData } = require('../database/utils/generateData')

const request = supertest(server)

describe('testing the organizations router', () => {
  describe('GET', () => {
    it('should return all organizations - GET /', async () => {
      const expected = await knex('organizations')
      const response = await request.get('/organizations')

      expect(response.status).toEqual(200)
      expect(response.body.length).toEqual(expected.length)
    })

    it('should return a JSON response', async () => {
      const response = await request.get('/organizations')
      expect(response.type).toEqual('application/json')
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
      expect([response.body]).toEqual(expected)

      await cleanup()
    })

    it('returns status code 404 for non-existent organization - GET/:id', async () => {
      const fake_id = 1
      const response = await request.get(`/organizations/${fake_id}`)

      expect(response.status).toEqual(404)
    })
  })

  describe('POST', () => {
    it('can create a new organization', async () => {
      const org = { name: 'Test Organization' }
      const response = await request.post('/organizations').send(org)
      expect(response.body).toEqual([1])
      expect(response.status).toBe(201)
    })

    it('can reject an empty organization', async () => {
      const org = {}
      const response = await request.post('/organizations').send(org)
      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'Missing required field "name"' })
    })
  })
})
