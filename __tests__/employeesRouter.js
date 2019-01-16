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

      let expected = await getEmployees(id)

      const processDateTime = date => {
        const { DB_ENV } = process.env
        if (DB_ENV === 'sqlite3') {
          return new Date(date).getTime()
        } else {
          return new Date(date).toJSON()
        }
      }

      const processDate = date => {
        const { DB_ENV } = process.env
        if (DB_ENV === 'sqlite3') {
          return new Date(date).toJSON().split('T')[0]
        } else {
          return new Date(date).toJSON()
        }
      }

      expected = expected.map(employee => ({
        ...employee,
        events: employee.events.map(event => ({
          ...event,
          start: processDateTime(event.start),
          end: processDateTime(event.end)
        })),
        time_off_requests: employee.time_off_requests.map(req => ({
          ...req,
          date: processDate(req.date)
        }))
      }))

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
