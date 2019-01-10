const supertest = require('supertest')
const server = require('../server/server')

const request = supertest(server)

describe('user endpoint', () => {
  beforeEach(() => {})

  afterAll(() => {})

  it('responds to a get request', async () => {
    const response = await request.get('/')
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ message: 'hello!' })
  })
})
