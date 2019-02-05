const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { generateTeamData } = require('../database/utils/generateData')

const request = supertest(server)

describe('testing the hours of operation router ', () => {
  it('gets availability based on id', async () => {
    const truncateTime = time =>
      time
        .split(':')
        .slice(0, 2)
        .join(':')

    // populates database with team data
    const { team, cleanup } = await generateTeamData(knex)
    const target = team.users[1]
    const avails = team.availabilities.filter(
      item => item.user_id === target.id
    )
    const response = await request
      .get(`/availabilities/${target.id}`)
      .set('authorization', 'token')

    // format so that eg 12:00:00 becomes 12:00
    // this is a trivial difference that happens due to format converstions
    const formattedRes = response.body.map(time => ({
      ...time,
      start_time: truncateTime(time.start_time),
      end_time: truncateTime(time.end_time)
    }))

    expect(response.status).toBe(200)
    expect(formattedRes).toEqual(avails)
    // cleans up unneeded team data after tests
    await cleanup()
  })
})
