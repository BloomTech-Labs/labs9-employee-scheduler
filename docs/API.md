### API Documentation

#### Organization Routes

GET `/organizations/:orgId`

Returns the information for an organization. 

Access control: all users.


POST `/organizations/` --> DEPRECATE?

Create a new organization.

Access control: owners.

Status: to be deprecated?

PUT `/organizatoins/:orgId`

Modify an existing organization.

Access control: owners.

DELETE `/organizations/:orgId` --> DEPRECATE?

Delete an organization. 

Access control: owners.


#### User Routes

POST `/current`

Returns info for the logged in user.

Access control: all users.

GET `/org/:userId`

Returns all users for an organization.

Access control: owners and supervisors.

GET `/:userId`

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

PUT `/availabilities/:availId`

Modifies an availability.

Access control: all

DELETE `/availabilities/:availId` --> DEPRECATE? (because we can just set to no avail for a given day)

Access control: all

#### Time Off Request Routes

GET `/time-off-requests/:userId`

Returns all time off requests for a given user.

Access control: all

POST `/time-off-requests/:userId`

Access control: all

PUT `/time-off-requests/:requestId`

Access control: all

DELETE `/time-off-requests/:requestId`

Access control: owners and supervisors


#### Events Routes

GET `/events/:userId` 

Access control: all

GET `/events/organization/:orgId`

Access control: owner, supervisor

POST `/events/`

Access control: owner, supervisor

PUT `/events/:eventId`

Access control: owner, supervisor

DELETE `/events/:eventId`

Access control: owner, supervisor


#### Dashboard Routes

GET `/dashboard/:userId` 

Returns all information for the dashboard

Access control: all


#### Stripe Routes

POST `/stripe`

Access control: owner

PUT `/stripe`

Access control: owner


#### Hours of Operation Routes

GET `/hours-of-operation/:orgId`

Access control: all

PUT `/hours-of-operation/:hourId`

Access control: owner, supervisor


#### Invites routes

POST `/invites/invite-supervisor` 

Access control: owner

POST `/invites/invite-employee` 

Access control: owner, supervisor

POST `/invites/register/:inviteId` 

Register in response to an invite.

No access control

