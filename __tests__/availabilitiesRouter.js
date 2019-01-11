const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { generateTeamData } = require('../database/utils/generateData')

const request = supertest(server)

describe('test get user id route /:id', () => {
  it('should return 404 if no users found', async () => {
    const response = await request.get('/availabilities/fakeId')
    expect(response.status).toEqual(404)
  })

  it('should return a JSON response', async () => {
    const response = await request.get('/availabilities/sdfasfas')
    expect(response.type).toEqual('application/json')
  })

  it('gets availability based on id', async () => {
    // populates database with team data
    const { team, cleanup } = await generateTeamData(knex)
    const target = team.users[1]
    const avails = team.availabilities.filter(
      item => item.user_id === target.id
    )
    console.log(target)
    const response = await request.get(`/availabilities/${target.id}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(avails)
    // cleans up unneeded team data after tests
    await cleanup()
  })
})
