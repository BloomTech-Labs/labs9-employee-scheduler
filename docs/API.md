### API Documentation

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| GET    | `/organizations/:orgId`         | all users           | Returns the information for an organization.       |
| PUT    | `/organizatoins/:orgId`         | owners              | Modify an existing organization.                   |
| DELETE | `/organizations/:orgId`         | owners              | Delete an organization.                            |
| POST   | `/users/current`                | all users           | Returns info for the logged in user.               |
| GET    | `/users/org/:userId`            | owners, supervisors | Returns all users for an organization.             |
| GET    | `/users/:userId`                | owners, supervisors | Returns info for a single user.                    |
| POST   | `/users/register/owner`         | none                | Creates a new user as owner of a new organization. |
| PUT    | `/users/:userId`                | owners, supervisors |                                                    |
| DELETE | `/users/:userId`                | owners, supervisors |                                                    |
| GET    | `/availabilities/:userId`       | all users           | Returns all availabilities for a given user.       |
| PUT    | `/availabilities/:availId`      | all users           | Modifies an availability.                          |
| GET    | `/time-off-requests/:userId`    | all users           | Returns all time off requests for a given user.    |
| POST   | `/time-off-requests/:userId`    | all users           |                                                    |
| PUT    | `/time-off-requests/:requestId` | all users           |                                                    |
| DELETE | `/time-off-requests/:requestId` | owners, supervisors |                                                    |
| GET    | `/events/:userId`               | all users           |                                                    |
| GET    | `/events/organization/:orgId`   | owners, supervisors |                                                    |
| POST   | `/events/`                      | owners, supervisors |                                                    |
| PUT    | `/events/:eventId`              | owners, supervisors |                                                    |
| DELETE | `/events/:eventId`              | owners, supervisors |                                                    |
| GET    | `/dashboard/:userId`            | all users           | Returns all information for the dashboard          |
| POST   | `/stripe`                       | owners              |                                                    |
| PUT    | `/stripe`                       | owners              |                                                    |
| GET    | `/hours-of-operation/:orgId`    | all users           |                                                    |
| PUT    | `/hours-of-operation/:hourId`   | owners, supervisors |                                                    |
| POST   | `/invites/invite-supervisor`    | owners              |                                                    |
| POST   | `/invites/invite-employee`      | owners, supervisors |                                                    |
| POST   | `/invites/register/:inviteId`   | none                | Register in response to an invite.                 |


#### Organization Routes

GET `/organizations/:orgId`

Returns the information for an organization. 

Access control: all users.


PUT `/organizatoins/:orgId`

Modify an existing organization.

Access control: owners.


DELETE `/organizations/:orgId` 

Delete an organization. 

Access control: owners.


#### User Routes

POST `/users/current`

Returns info for the logged in user.

Access control: all users.

GET `/users/org/:userId`

Returns all users for an organization.

Access control: owners and supervisors.

GET `/users/:userId`

Returns info for a single user.

Access control: owners and supervisors.

POST `/users/register/owner`

Creates a new user as owner of a new organization.

No access control.

PUT `/users/:userId`

Access control: owners, supervisors

DELETE `/users/:userId`

Access control: owners, supervisors


#### Availability Routes

GET `/availabilities/:userId` 

Returns all availabilities for a given user.

Access control: all


PUT `/availabilities/:availId`

Modifies an availability.

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

