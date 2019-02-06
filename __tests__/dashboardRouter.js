const supertest = require('supertest')
const server = require('../server/server')

const request = supertest(server)

describe('testing the dashboard router', () => {
  it('returns correctly formatted data for logged in user', async () => {
    const response = await request
      .get('/dashboard')
      .set('authorization', 'testing')
      .set('user', 'owner')

    const {
      id,
      first_name,
      last_name,
      availabilities,
      shifts,
      time_off
    } = response.body

    const valid =
      id &&
      typeof id === 'string' &&
      (first_name && typeof first_name === 'string') &&
      (last_name && typeof last_name === 'string') &&
      (availabilities && Array.isArray(availabilities)) &&
      (shifts && Array.isArray(shifts)) &&
      (time_off && Array.isArray(shifts))
        ? true
        : false

    expect(valid).toBe(true)
  })

  it('returns 404 if user not logged in', async () => {
    const response = await request.get('/dashboard')

    expect(response.status).toBe(403)
  })
})
