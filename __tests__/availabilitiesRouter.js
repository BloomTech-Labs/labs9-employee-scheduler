const supertest = require('supertest')
const server = require('../server/server')

const request = supertest(server)

describe('test get user id route /:id', () => {
  it('should return 404 if no users found', async () => {
    const response = await request.get('/availability/fakeId')
    expect(response.status).toEqual(404)
  })

  it('should return a text/HTML response', async () => {
    const response = await request.get('/availability/sdfasfas')
    expect(response.type).toEqual('text/html')
  })
})
