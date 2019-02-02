## models

#### ORGANIZATIONS
---
```
{
  id: UUID
  name: STRING
  industry: STRING
  paid: BOOLEAN
  customer_id: STRING
  subscription_id: STRING
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
  cal_visit: BOOLEAN
  emp_visit: BOOLEAN
  emailpref: BOOLEAN
  phonepref: BOOLEAN
}
```

#### AVAILABILITIES
---
```
{
  id: UUID
  user_id: UUID foreign key in USERS table
  day: INTEGER [ 0- 6 ]
  start_time: TIME STRING [ 0 - 23 ] [HH:MM:SS]
  end_time: STRING STRING [ 0 - 23 ] [HH:MM:SS]
  off: BOOLEAN
}
```

#### TIME_OFF_REQUESTS
---
```
{
  id: UUID
  user_id: UUID foreign key in USERS table
  start: DATE & TIME STRING in YYYY-MM-DD [ 0 - 23 ] [HH:MM:SS]
  end: DATETIME STRING in YYYY-MM-DD [ 0 - 23 ] [HH:MM:SS]
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
  start: DATETIME STRING
  end: DATETIME STRING
}
```

#### HOURS OF OPERATION
---
```
{
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  day: INTEGER [ 0 -6 ]
  open: TIME STRING [ 0 - 23]
  close: TIME STRING [ 0 - 23]
  closed: BOOLEAN
}
```

#### INVITES
---
```
{
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  inviter_id: UUID foreign key in USERS table
  name: STRING
  email: STRING
  role: STRING [ 'supervisor', 'employee' ]
}
```

## actions

`insertHoursForNewOrg()` -> used for seed generation

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID

<br>

`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

<br>

`getAvailabilities(userId)` --> gets all availabilties for a user

`getAvailability(availabilityId)` --> gets a singe availability

`addAvailability(userId, day object)` --> adds new day

`updateAvailability(availabilityId, changes object)` --> updates existing day

`deleteAvailability(availabilityId)` --> deletes day

<br>

`getTimeOffRequests(userId)` -> Return time off request by user ID

`getTimeOffRequest(requestId)` -> Return a single request by request ID

`addTimeOffRequest(request object)` -> Add a time off request

`updateTimeOffRequest(timeOffRequestId, changes object)` -> Update a time off request by request ID

`deleteTimeOffRequest(timeOffRequestId)` -> Delete a request by request ID

<br>

`getTimeOffRequestsForOrg(orgId)` --> returns a list of the above but for each employee

<br>

`getEvents(userId)` -> Return all events by user ID

`getEvent(eventId)` -> Return an event by it's event ID

`addEvent(event object)` --> returns created event object

`updateEvent(eventId, changes object)` --> returns the updated event object

`deleteEvent(eventId)` -> Delete an event by event ID

<br>

`getEventsForOrg(orgId)` --> returns list of all events for all users for an org

<br>

`getHoursOfOperation(orgId)` -> Returns hours of operation by organization ID

`updateHoursOfOperation(hourId, updates)` -> Update a single hour of operation by it's ID

`addHour(hour)` -> add a new Hour of Operation

<br>

`getInvite(inviteId)` -> Return an invite by its ID

`addInvite(invite object)` -> Create a new invite

`updateInvite(inviteId, updates object)` -> Update an invite by its ID

`deleteInvite(inviteId)` -> Delete an invite
