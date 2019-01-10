## models

#### ORGANIZATIONS
---
```
{
  id: UUID
  name: STRING
  description: STRING
}
```

#### USERS
---
```
{
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  first_name: STRING
  last_name: STRING
  role: STRING [ 'owner', 'supervisor', 'employee' ]
  email: STRING
  phone: STRING
}
```

#### AVAILABILITIES
---
```
{
  id: uuid
  user_id: UUID foreign key in USERS table
  day: INTEGER [ 0- 6 ]
  start_time: INTEGER [ 0 - 23]
  end_time: INTEGER [ 0 - 23]
}
```

#### TIME_OFF_REQUESTS
---
```
{
  id: UUID
  user_id: UUID foreign key in USERS table
  date: DATE in YYYY-MM-DD format 
  reason: STRING
  status: STRING [ 'pending', 'confirmed', 'denied' ]
}
```

#### EVENTS
---
```
{
  id: uuid
  user_id: UUID foreign key in USERS table
  day: INTEGER [ 0- 6 ]
  start_time: INTEGER [ 0 - 23]
  end_time: INTEGER [ 0 - 23]
}
```

## actions

`getOrgs()`

`addOrg()`

`updateOrg(ordId)`

`deleteOrg(ordId)`

<br>

`getUsers(orgId)` --> if no param all users

`addUser(ordId, user object)`

`updateUser(userId, changes object)`

`deleteUser(userId)` --> deletes everything dependent on the user

<br>

`getAvailabilities(userId, constraint object)` --> default to showing next week

`addAvailability(userId, day object)` --> adds new day

`updateAvailability(availabilityId, changes object)` --> updates existing day

`deleteAvailability(availabilityId)` --> deletes day

<br>

`getTimeOffRequests(userId)`

`addTimeOffRequest(userId, request object)`

`updateTimeOffRequest(timeOffRequestId, changes object)`

`deleteTimeOffRequest(timeOffRequestId)`

<br>

`getTimeOffRequestsForOrg(orgId)` --> returns a list of the above but for each employee

<br>

`getEvents(userId)`

`addEvent(userId, event object)`

`updateEvent(eventId, changes object)`

`deleteEvent(eventId)`

<br>

`getEventsForOrg(orgId)` --> returns list of all events for all users for an org
