const { generateTeamData } = require('../database/utils/generateData')
const knex = require('../database/dbConfig')

describe('generateTeamData', () => {
  it('creates new items for all tables', async () => {
    // gets original table values
    const originalOrg = await knex('organizations')
    const originalUsers = await knex('users')
    const originalEvents = await knex('events')
    const originalTimeOff = await knex('time_off_requests')
    const originalAvails = await knex('availabilities')

    // runs generateTeamData
    const { team, cleanup } = await generateTeamData(knex)

    const {
      organization,
      users,
      events,
      timeOffRequests,
      availabilities
    } = team

    // gets new table data after generateTeamData runs
    let newOrg = await knex('organizations')
    let newUsers = await knex('users')
    let newEvents = await knex('events')
    let newTimeOff = await knex('time_off_requests')
    let newAvails = await knex('availabilities')

    // make sure that team categories are non-0 length arrays
    expect(newUsers.length).toBeGreaterThan(0)
    expect(newEvents.length).toBeGreaterThan(0)
    expect(newTimeOff.length).toBeGreaterThan(0)
    expect(newAvails.length).toBeGreaterThan(0)

    // make sure table lengths are longer
    expect(newOrg.length).toEqual(originalOrg.length + 1)
    expect(newUsers.length).toEqual(originalUsers.length + users.length)
    expect(newEvents.length).toEqual(originalEvents.length + events.length)
    expect(newTimeOff.length).toEqual(
      originalTimeOff.length + timeOffRequests.length
    )
    expect(newAvails.length).toEqual(
      originalAvails.length + availabilities.length
    )

    // run cleanup to delete newly created data
    await cleanup()

    // get updated table arrays
    newOrg = await knex('organizations')
    newUsers = await knex('users')
    newEvents = await knex('events')
    newTimeOff = await knex('time_off_requests')
    newAvails = await knex('availabilities')

    // make sure table lengths have returned to original amount
    expect(newOrg.length).toEqual(originalOrg.length)
    expect(newUsers).toEqual(originalUsers)
    expect(newEvents.length).toEqual(originalEvents.length)
    expect(newTimeOff.length).toEqual(originalTimeOff.length)
    expect(newAvails.length).toEqual(originalAvails.length)
  })
})
