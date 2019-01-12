const { generateTeamData } = require('../database/utils/generateData')
const knex = require('../database/dbConfig')

describe('generateTeamData', () => {
  it('creates new items for all tables', async () => {
    const originalOrg = await knex('organizations')
    const originalUsers = await knex('users')
    const originalEvents = await knex('events')
    const originalTimeOff = await knex('time_off_requests')
    const originalAvails = await knex('availabilities')

    const { team, cleanup } = await generateTeamData()

    const {
      organizations,
      users,
      events,
      timeOffRequests,
      availabilities
    } = team
    expect(organizations.length).toBeGreaterThan(originalOrg.length)
    expect(users.length).toBeGreaterThan(originalUsers.length)
    expect(events.length).toBeGreaterThan(originalEvents.length)
    expect(timeOffRequests.length).toBeGreaterThan(originalTimeOff.length)
    expect(availabilities.length).toBeGreaterThan(originalAvails.length)
  })
})
