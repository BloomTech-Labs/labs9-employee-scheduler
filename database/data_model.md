## actions

getOrgs()
addOrg()
updateOrg(ordId)
deleteOrg(ordId)

getUsers(orgId) --> if no param all users
addUser(ordId) 
updateUser(userId, changes object)
deleteUser(userId)

getAvailabilities(userId)
addAvailability(userId, day object) --> adds new day
updateAvailability(availabilityId, changes object) --> updates existing day
deleteAvailability(availabilityId) --> deletes day

getTimeOffRequests(userId)
addTimeOffRequest(userId, request object)
updateTimeOffRequest(timeOffRequestId, changes object)
deleteTimeOffRequest(timeOffRequestId)

getTimeOffRequestsForOrg(orgId) --> returns a list of the above but for each employee

getEvents(userId)
addEvent(userId, event object)
updateEvent(eventId, changes object)
deleteEvent(eventId)

getEventsByOrg(orgId) --> returns list of all events for all users for an org
