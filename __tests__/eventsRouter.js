const supertest = require('supertest')
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

    // response is still coming back undefined
    // therefore test is not passing

    const newEvent = {
      user_id: targetUser.id,
      start: 1547388000000,
      end: 1547416800000
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
      start: processDateTime(createdEvent.start),
      end: processDateTime(createdEvent.end)
    }

    expect(response.status).toEqual(201)
    expect(response.body).toMatchObject(createdEvent)
    expect(createdEvent).toMatchObject(newEvent)

    await cleanup()
  })
})
