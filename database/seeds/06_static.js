const {
  organization,
  users,
  availabilities,
  timeOffRequests,
  events
} = require('../static_seed.json')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('organizations')
    .del()
    .where('id', organization.id)
    .then(function() {
      // Inserts seed entries
      return knex('organizations')
        .insert(organization)
        .then(() => {
          return knex('users').insert(users)
        })
        .then(() => {
          return knex('availabilities').insert(availabilities)
        })
        .then(() => {
          return knex('time_off_requests').insert(timeOffRequests)
        })
        .then(() => {
          return knex('events').insert(events)
        })
      // .catch(err => {
      //   for (i in err) {
      //     console.log(err[i])
      //   }
      // })
    })
}
