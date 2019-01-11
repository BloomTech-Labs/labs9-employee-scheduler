const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { generateTeamData } = require('../database/utils/generateData')

// const admin = require('firebase-admin')

const request = supertest(server)

describe('/user route', () => {
  describe('GET /', () => {
    it('returns all users', async () => {
      const expected = await knex('users')

      const response = await request.get('/users').set('authorization', 'token')

      expect(response.status).toEqual(200)
      expect(response.body.length).toEqual(expected.length)
    })
  })
  describe('GET /id', () => {
    it('returns all users for an org', async () => {
      // populates database with team data
      const { team, cleanup } = await generateTeamData(knex)

      const { id } = team.organization
      const expected = await knex('users').where({
        organization_id: id
      })

      const response = await request
        .get(`/users/${id}`)
        .set('authorization', 'token')

      expect(response.status).toEqual(200)
      expect(response.body.length).toEqual(expected.length)

      // cleans up unneeded team data after tests
      await cleanup()
    })
  })

  describe('GET /current', () => {
    it('returns the current user', async () => {
      // populates database with team data
      const { team, cleanup } = await generateTeamData(knex)

      const user = team.users[0]

      const response = await request
        .get('/users/current')
        .set('authorization', user.id)

      expect(response.body).toEqual(user)
      expect(response.status).toEqual(200)
      // cleans up unneeded team data after tests
      await cleanup()
    })

    it('returns 404 for non-existent user', async () => {
      // populates database with team data
      const { team, cleanup } = await generateTeamData(knex)

      const user = team.users[0]

      await knex('users').delete(user.id)

      const response = await request
        .get('/users/current')
        .set('authorization', user.id)

      expect(response.status).toEqual(404)
      expect(response.body).toEqual({ message: 'User not found.' })
      // cleans up unneeded team data after tests
      await cleanup()
    })
  })

  describe('PUT /:id', () => {
    it('edits a user with id', async () => {
      // populates database with team data
      const { team, cleanup } = await generateTeamData(knex)

      const { users } = team
      const target = users[0]
      const changes = { first_name: 'Henry' }
      const response = await request
        .put(`/users/${target.id}`)
        .send(changes)
        .set('authorization', 'token')

      const updatedUser = await knex('users')
        .where({ id: target.id })
        .first()
      expect(response.status).toBe(200)
      expect(response.body).toEqual(1)
      expect(updatedUser).toEqual({ ...target, ...changes })

      // cleans up unneeded team data after tests
      await cleanup()
    })

    it('returns 404 for non-existent user', async () => {
      // populates database with team data
      const { team, cleanup } = await generateTeamData(knex)

      const user = team.users[0]

      await knex('users').delete(user.id)

      const response = await request
        .put('/users/current')
        .set('authorization', user.id)

      expect(response.status).toEqual(404)
      expect(response.body).toEqual({ error: 'User not found' })
      // cleans up unneeded team data after tests
      await cleanup()
    })
  })
})
