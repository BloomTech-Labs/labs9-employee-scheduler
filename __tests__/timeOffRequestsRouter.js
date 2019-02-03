const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { generateUser } = require('../database/utils/generateData')
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

  it('returns requests on user id', async () => {
    const { user, cleanup } = await generateUser(knex)
    console.log(user)
    const { id } = user
    const expected = await knex('time_off_requests').where({
      user_id: id
    })

    const response = await request
      .get(`/time_off_requests/${id}`)
      .set('authorization', 'testing')

    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(expected.length)

    await cleanup()
  })
})
