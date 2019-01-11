const db = require('../dbConfig')

const getDashboard = async orgId => {
  return {
    user: [
      {
        id: 1,
        firstname: 'Ariel',
        lastname: 'Smith',
        assignedShift: [
          {
            id: 1,
            date: 'July 18',
            times: '10am-2pm'
          },
          {
            id: 2,
            date: 'July 20',
            times: '10am-2pm'
          },
          {
            id: 3,
            date: 'July 21',
            times: '10am-2pm'
          }
        ],
        timeOfApproved: {
          date: 'July 24th'
        },
        timeOfRequest: {
          data: 'July 25th',
          reason: 'Sick day'
        }
      }
    ]
  }
}

module.exports = {
  getDashboard
}
