const supertest = require('supertest')
const moment = require('moment')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { generateTeamData } = require('../database/utils/generateData')
const { processDateTime } = require('../database/utils/dbUtils')

const request = supertest(server)

describe('eventsRouter', () => {
  it('GET /events/:id returns all events for a userId', async () => {
    const { team, cleanup } = await generateTeamData(knex)

    const targetUser = team.users[0]

    const targetEvents = team.events
      .filter(event => event.user_id === targetUser.id)
      .map(event => ({
        ...event,
        start: processDateTime(event.start),
        end: processDateTime(event.end)
      }))

    const response = await request
      .get(`/events/${targetUser.id}`)
      .set('authorization', 'testing')

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(targetEvents)
    await cleanup()
  })

  it('POST /events allows for the creation of an event shift', async () => {
    const { team, cleanup } = await generateTeamData(knex)

    const targetUser = team.users[0]

    const newEvent = {
      user_id: targetUser.id,
      start: moment({ hours: 9 }).utc(),
      end: moment({ hours: 17 }).utc()
    }

    const response = await request
      .post('/events')
      .send(newEvent)
      .set('authorization', 'testing')

    expect(response.status).toEqual(201)
    expect(response.body).toMatchObject(JSON.parse(JSON.stringify(newEvent)))

    await cleanup()
  })
})
