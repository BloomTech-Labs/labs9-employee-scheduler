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
})

describe('GET /:id', () => {
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
    expect(response.body).toEqual(id)
    await cleanup()
  })
})

describe('PUT /:id', () => {
  it('responds with 200 when a new put request goes through', async () => {
    const { team, cleanup } = await generateTeamData(knex)

    const { id } = await team.users[0]
    const expected = await knex('time_off_requests').where({ user_id: id })
    const changes = {
      start: '2019-02-20 00:00:00:-05',
      end: '2019-03-05 23:59:59-05'
    }
    const response = await request
      .put(`/time-off-requests/${id}`)
      .send(changes)
      .set('authorization', 'testing')

    let updatedRequest = await knex('time_off_requests')
      .where({ user_id: id })
      .first()

    updatedRequest = {
      ...updatedRequest
    }
    expect(response.status).toBe(200)

    await cleanup()
  })
})
