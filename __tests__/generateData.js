const { generateTeamData } = require('../database/utils/generateData')
const knex = require('../database/dbConfig')

describe('generateTeamData', () => {
  it('creates new items for all tables', async () => {
    const originalOrg = await knex('organizations')
    const originalUsers = await knex('users')
    const originalEvents = await knex('events')
    const originalTimeOff = await knex('time_off_requests')
    const originalAvails = await knex('availabilities')

    const { team, cleanup } = await generateTeamData(knex)

    const {
      organization,
      users,
      events,
      timeOffRequests,
      availabilities
    } = team

    let newOrg = await knex('organizations')
    let newUsers = await knex('users')
    let newEvents = await knex('events')
    let newTimeOff = await knex('time_off_requests')
    let newAvails = await knex('availabilities')

    expect(newOrg.length).toEqual(originalOrg.length + 1)
    expect(newUsers.length).toEqual(originalUsers.length + users.length)
    expect(newEvents.length).toEqual(originalEvents.length + events.length)
    expect(newTimeOff.length).toEqual(
      originalTimeOff.length + timeOffRequests.length
    )
    expect(newAvails.length).toEqual(
      originalAvails.length + availabilities.length
    )
    await cleanup()

    newOrg = await knex('organizations')
    newUsers = await knex('users')
    newEvents = await knex('events')
    newTimeOff = await knex('time_off_requests')
    newAvails = await knex('availabilities')

    expect(newOrg.length).toEqual(originalOrg.length)
    expect(newUsers).toEqual(originalUsers)
    expect(newEvents.length).toEqual(originalEvents.length)
    expect(newTimeOff.length).toEqual(originalTimeOff.length)
    expect(newAvails.length).toEqual(originalAvails.length)
  })
})
