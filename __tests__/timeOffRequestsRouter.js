const supertest = require('supertest')
const server = require('../server/server')
const request = supertest(server)

describe('Time off Request', () => {
  it('responds 404 when no id is sent', async () => {
    const response = await request.get('/time-off-requests/')
    expect(response.status).toEqual(404)
  })

  it('responds 404 when no id is sent', async () => {
    const response = await request.post('/time-off-requests/').send({
      date: '2000-01-01',
      reason: 'test',
      status: 'pending'
    })
    expect(response.status).toEqual(404)
  })
})
