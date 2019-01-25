### API Documentation

#### Organization Routes

GET `/organizations/:id`

Returns the information for an organization. 

Access control: all users.


POST `/organizations/` --> DEPRECATE?

Create a new organization.

Access control: owners.

Status: to be deprecated?

PUT `/organizatoins/:id`

Modify an existing organization.

Access control: owners.

DELETE `/organizations/:id` --> DEPRECATE?

Delete an organization. 

Access control: owners.


#### User Routes

POST `/current`

Returns info for the logged in user.

Access control: all users.

GET `/org/:id`

Returns all users for an organization.

Access control: owners and supervisors.

GET `/:id`

Returns info for a single user.

Access control: owners and supervisors.

POST `/register/owner`

Creates a new user as owner of a new organization.

No access control.


#### Availability Routes

GET `/availabilities/:userId` 

Returns all availabilities for a given user.

Access control: all

POST `/availabilities/:userId` --> DEPRECATE? (because already 7 per user?)

Adds a new availability for a user

Access control: all

PUT `/availabilities/:id`

Modifies an availability.

Access control: all

DELETE `/availabilities/:id` --> DEPRECATE? (because we can just set to no avail for a given day)

Access control: all

#### Time Off Request Routes

GET `/time-off-requests/:userId`

Returns all time off requests for a given user.

Access control: all

POST `/time-off-requests/:userId`

Access control: all

PUT `/time-off-requests/:id`

Access control: all

DELETE `/time-off-requests/:id`

Access control: owners and supervisors


#### Events Routes

server.use('/events', eventsRouter)


#### Dashboard Routes

server.use('/dashboard', dashboardRouter)


#### Stripe Routes

server.use('/stripe', paymentRouter)


#### Hours of Operation Routes

server.use('/hours-of-operation', hoursOfOperationRouter)


#### Invites routes

server.use('/invites', invitesRouter)

