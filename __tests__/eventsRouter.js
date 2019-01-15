const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { generateTeamData } = require('../database/utils/generateData')

const request = supertest(server)

describe('eventsRouter', () => {
  it('GET /events/:id returns all events for a userId', async () => {
    const { team, cleanup } = await generateTeamData(knex)

    const targetUser = team.users[0]
    console.log(targetUser)
    const targetEvents = team.events
      .filter(event => event.user_id === targetUser.id)
      .map(event => ({
        ...event,
        start: event.start.getTime(),
        end: event.end.getTime()
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

    const now = Date.now()
    const newEvent = {
      end: new Date(Date.now() + 60 * 60 * 60 * 1000).getTime(),
      start: new Date(now).getTime(),
      user_id: targetUser.id
    }

    const response = await request
      .post('/events')
      .send(newEvent)
      .set('authorization', 'testing')

    const createdEvent = await knex('events')
      .where(newEvent)
      .first()

    expect(response.status).toEqual(201)
    expect(typeof response.body[0]).toBe('number')

    expect(createdEvent).toMatchObject(newEvent)
    await cleanup()
  })
})
