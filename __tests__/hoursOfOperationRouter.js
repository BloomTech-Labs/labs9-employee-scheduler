const supertest = require('supertest')
const server = require('../server/server')

const request = supertest(server)

describe('testing the hours of operation router ', () => {
  it('gets hours of operation', async () => {
    const orgId = '9126df31-2607-4166-9c0c-d0a300c59c62'

    const response = await request
      .get(`/hours-of-operation/${orgId}`)
      .set('authorization', 'token')
      .set('user', 'owner')

    const numberOfDays = response.body.length
    const oneOfEachDay =
      response.body.reduce((acc, { day }) => {
        if (!acc.includes(day)) {
          return [...acc, day]
        } else {
          return acc
        }
      }, []).length === 7
        ? true
        : false

    expect(numberOfDays).toBe(7)
    expect(oneOfEachDay).toBe(true)
  })
})
