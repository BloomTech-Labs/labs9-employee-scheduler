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
  start: DATETIME
  end: DATETIME
}
```

#### HOURS OF OPERATION
---
```
{
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  day: INTEGER [ 0 -6 ]
  open: FLOAT [ 0 - 23]
  close: FLOAT [ 0 - 23]
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

`getOrgs()`

`getOrg(orgId)`

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)`

`deleteOrg(orgId)`

<br>

`getUsers(orgId)` --> if no param all users

`getUser(userId)`

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)`

`deleteUser(userId)` --> deletes everything dependent on the user

<br>

`getAvailabilities(userId)` --> gets all availabilties for a user

`getAvailability(availabilityId)` --> gets a singe availability

`addAvailability(userId, day object)` --> adds new day

`updateAvailability(availabilityId, changes object)` --> updates existing day

`deleteAvailability(availabilityId)` --> deletes day

<br>

`getTimeOffRequests(userId)`

`getTimeOffRequest(requestId)`

`addTimeOffRequest(request object)`

`updateTimeOffRequest(timeOffRequestId, changes object)`

`deleteTimeOffRequest(timeOffRequestId)`

<br>

`getTimeOffRequestsForOrg(orgId)` --> returns a list of the above but for each employee

<br>

`getEvents(userId)`

`getEvent(eventId)`

`addEvent(event object)` --> returns created event object

`updateEvent(eventId, changes object)` --> returns the updated event object

`deleteEvent(eventId)`

<br>

`getEventsForOrg(orgId)` --> returns list of all events for all users for an org

<br>

`getHoursOfOperation(orgId)`

`updateHoursOfOperation(hourId, updates)`

`addHour(hour)`

<br>

`getInvite(inviteId)`

`addInvite(invite object)`

`updateInvite(inviteId, updates object)`

`deleteInvite(inviteId)`
