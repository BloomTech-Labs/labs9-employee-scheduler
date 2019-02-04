const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { generateTeamData } = require('../database/utils/generateData')
const request = supertest(server)

describe('Time off Request', () => {
  it('responds 404 when no id is sent', async () => {
    const response = await request
      .get('/time-off-requests/')
      .set('authorization', 'testing')
    expect(response.status).toEqual(404)
  })

  it('responds 404 when no id is sent', async () => {
    const response = await request
      .post('/time-off-requests/')
      .send({
        date: '2000-01-01',
        reason: 'test',
        status: 'pending'
      })
      .set('authorization', 'testing')
    expect(response.status).toEqual(404)
  })

  describe('GET /:id TimeOffRequest', () => {
    it('responds 200 when user id is sent', async () => {
      // populates database with team data
      const { team, cleanup } = await generateTeamData(knex)

      // need to add cal_visit and emp_visit because they are not added by
      // generateTeamData but instead are default values in the db model
      const { id } = await team.users[0]
      const expected = await knex('time_off_requests').where({
        user_id: id
      })

      const response = await request
        .get(`/time-off-requests/${id}`)
        .set('authorization', 'testing')
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body.length).toEqual(expected.length)
      expect(response.body.type).toEqual(expected.type)
      await cleanup()
    })
  })

  describe('PUT /:id TimeOffRequest', () => {
    it('responds with 200 when a new put request goes through', async () => {
      const { team, cleanup } = await generateTeamData(knex)

      // const { id } = await team.users[0]
      const { users } = team
      // need to add cal_visit and emp_visit because they are not added by
      // generateTeamData but instead are default values in the db model
      const target = { ...users[0], cal_visit: true, emp_visit: true }
      const changes = {
        start: '2019-02-20 01:00:00-05',
        end: '2019-02-20 23:59:59-05'
      }
      const response = await request
        .put(`/time-off-requests/${target.id}`)
        .send(changes)
        .set('authorization', 'testing')

      let updatedUser = await knex('users')
        .where({ id: target.id })
        .first()

      updatedUser = {
        ...updatedUser,
        start: changes.start,
        end: changes.end
      }

      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body).toEqual('')
      expect(updatedUser).toEqual({ ...target, ...changes })
      await cleanup()
    })
  })
  describe('DELETE /:id TimeOffRequest', async () => {
    const { team, cleanup } = await generateTeamData(knex)
    const { id } = await team.timeOffRequests[0]
    const response = await request
      .delete(`/time-off-requests/${id}`)
      .set('authorization', 'testing')

    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual(1)
    await cleanup()
  })
})
