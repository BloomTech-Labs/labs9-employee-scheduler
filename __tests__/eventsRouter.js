const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const { generateTeamData } = require('../database/utils/generateData')

const request = supertest(server)

describe('eventsRouter', () => {
  it('GET /events/:id returns all events for a userId', async () => {
    const { team, cleanup } = await generateTeamData(knex)

    const targetUser = team.users[0]

    const targetEvents = team.events
      .filter(event => event.user_id === targetUser.id)
      .map(event => ({
        ...event,
        start: event.start.toJSON(),
        end: event.end.toJSON()
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
      end: new Date(Date.now() + 3 * 60 * 60 * 1000).toJSON(),
      start: new Date(now).toJSON(),
      user_id: targetUser.id
    }

    const response = await request
      .post('/events')
      .send(newEvent)
      .set('authorization', 'testing')

    let createdEvent = await knex('events')
      .where(newEvent)
      .first()

    createdEvent = {
      ...createdEvent,
      start: createdEvent.start.toJSON(),
      end: createdEvent.end.toJSON()
    }

    expect(response.status).toEqual(201)
    expect(response.body[0]).toMatchObject(createdEvent)
    expect(createdEvent).toMatchObject(newEvent)

    await cleanup()
  })
})
