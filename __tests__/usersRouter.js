const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { generateTeamData } = require('../database/utils/generateData')

// const admin = require('firebase-admin')

const request = supertest(server)

describe('/users route', () => {
  describe('GET /', () => {
    it('returns all users', async () => {
      const expected = await knex('users')

      const response = await request
        .get('/users')
        .set('authorization', 'testing')

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
        .get(`/users/org/${id}`)
        .set('authorization', 'testing')

      expect(response.status).toEqual(200)
      expect(response.body.length).toEqual(expected.length)

      // cleans up unneeded team data after tests
      await cleanup()
    })
  })

  describe('GET /:id', () => {
    it('returns the user by their id', async () => {
      // populates database with team data
      const { team, cleanup } = await generateTeamData(knex)

      // need to add cal_visit and emp_visit because they are not added by
      // generateTeamData but instead are default values in the db model
      const user = { ...team.users[0], cal_visit: true, emp_visit: true }

      const response = await request
        .get(`/users/${user.id}`)
        .set('authorization', 'testing')

      let { body } = response
      body = {
        ...body,
        emailpref: Boolean(body.emailpref),
        phonepref: Boolean(body.phonepref),
        cal_visit: true,
        emp_visit: true
      }

      expect(body).toEqual(user)
      expect(response.status).toEqual(200)
      // cleans up unneeded team data after tests
      await cleanup()
    })

    it('returns 404 for non-existent user', async () => {
      // populates database with team data
      const { team, cleanup } = await generateTeamData(knex)

      const user = team.users[0]

      await knex('users')
        .delete()
        .where('id', user.id)

      const response = await request
        .get(`/users/${user.id}`)
        .set('authorization', 'testing')

      expect(response.status).toEqual(404)
      expect(response.body).toEqual({ message: 'User not found.' })
      // cleans up unneeded team data after tests
      await cleanup()
    })
  })

  describe('POST', () => {
    const userTemplate = {
      first_name: 'Joop',
      last_name: 'Jorgenson',
      role: 'employee',
      email: 'Jorp@jorp.com',
      phone: '555-555-5555'
    }
    it('creates a new user when valid input is sent', async () => {
      const { team, cleanup } = await generateTeamData(knex)

      const { organization } = team

      const newUser = { ...userTemplate, organization_id: organization.id }

      const response = await request
        .post('/users')
        .send(newUser)
        .set('authorization', 'testing')

      // expectation on response
      expect(response.status).toEqual(201)
      expect(response.body).toMatchObject(newUser)

      // expect new data to be in database
      const dbUser = await knex('users')
        .where('id', response.body.id)
        .first()
      expect(dbUser).toMatchObject(newUser)
      const dates = await knex('availabilities')
        .where('user_id', response.body.id)
        .orderBy('day')
      expect(dates.length).toEqual(7)
      const hours = await knex('hours_of_operation')
        .where('organization_id', organization.id)
        .orderBy('day')
      expect(hours.length).toEqual(7)
      hours.map(({ day, close_time, open_time, closed }, i) => {
        expect(day).toEqual(dates[i].day)
        expect(open_time).toEqual(dates[i].start_time)
        expect(close_time).toEqual(dates[i].end_time)
        expect(closed).toEqual(dates[i].off)
      })

      // cleans up unneeded team data after tests
      await knex('users')
        .del()
        .where('id', response.body.id)
      await knex('availabilities')
        .del()
        .where('user_id', response.body.id)
      await cleanup()
    })
  })

  describe('PUT /:id', () => {
    it('edits a user with id', async () => {
      // populates database with team data
      const { team, cleanup } = await generateTeamData(knex)

      const { users } = team
      // need to add cal_visit and emp_visit because they are not added by
      // generateTeamData but instead are default values in the db model
      const target = { ...users[0], cal_visit: 'true', emp_visit: 'true' }
      const changes = { first_name: 'Henry' }
      const response = await request
        .put(`/users/${target.id}`)
        .send(changes)
        .set('authorization', 'testing')

      let updatedUser = await knex('users')
        .where({ id: target.id })
        .first()

      updatedUser = {
        ...updatedUser,
        phonepref: Boolean(updatedUser.phonepref),
        emailpref: Boolean(updatedUser.emailpref)
      }
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

      await knex('users')
        .delete()
        .where('id', user.id)

      const response = await request
        .put(`/users/${user.id}`)
        .set('authorization', 'testing')

      expect(response.status).toEqual(404)
      expect(response.body).toEqual({ error: 'User not found' })
      // cleans up unneeded team data after tests
      await cleanup()
    })
  })
})
