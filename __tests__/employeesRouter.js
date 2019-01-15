const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { getEmployees } = require('../database/helpers/employeesHelper')
const { generateTeamData } = require('../database/utils/generateData')

const request = supertest(server)

describe('testing the employees router', () => {
  describe('GET by id', () => {
    it('returns the correct employee by ID - GET /:id', async () => {
      const { team, cleanup } = await generateTeamData(knex)
      const { id } = team.organization

      const expected = await getEmployees(id)

      const response = await request
        .get(`/employees/${id}`)
        .set('authorization', 'testing')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expected)

      await cleanup()
    })

    it('returns an array', async () => {
      const { team, cleanup } = await generateTeamData(knex)
      const { id } = team.organization

      const response = await request
        .get(`/employees/${id}`)
        .set('authorization', 'testing')

      expect(Array.isArray(response.body)).toBe(true)

      await cleanup()

    })
  })
})
