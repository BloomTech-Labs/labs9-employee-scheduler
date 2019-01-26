### API Documentation


#### Organization Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| GET    | `/organizations/:orgId`         | all users           | Returns the information for an organization.       |
| PUT    | `/organizatoins/:orgId`         | owners              | Modify an existing organization.                   |
| DELETE | `/organizations/:orgId`         | owners              | Delete an organization.                            |


#### User Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| POST   | `/users/current`                | all users           | Returns info for the logged in user.               |
| GET    | `/users/org/:userId`            | owners, supervisors | Returns all users for an organization.             |
| GET    | `/users/:userId`                | owners, supervisors | Returns info for a single user.                    |
| POST   | `/users/register/owner`         | none                | Creates a new user as owner of a new organization. |
| PUT    | `/users/:userId`                | owners, supervisors |                                                    |
| DELETE | `/users/:userId`                | owners, supervisors |                                                    |


#### Availability Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| GET    | `/availabilities/:userId`       | all users           | Returns all availabilities for a given user.       |
| PUT    | `/availabilities/:availId`      | all users           | Modifies an availability.                          |


#### Time Off Request Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| GET    | `/time-off-requests/:userId`    | all users           | Returns all time off requests for a given user.    |
| POST   | `/time-off-requests/:userId`    | all users           |                                                    |
| PUT    | `/time-off-requests/:requestId` | all users           |                                                    |
| DELETE | `/time-off-requests/:requestId` | owners, supervisors |                                                    |


#### Events Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| GET    | `/events/:userId`               | all users           |                                                    |
| GET    | `/events/organization/:orgId`   | owners, supervisors |                                                    |
| POST   | `/events/`                      | owners, supervisors |                                                    |
| PUT    | `/events/:eventId`              | owners, supervisors |                                                    |
| DELETE | `/events/:eventId`              | owners, supervisors |                                                    |


#### Dashboard Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| GET    | `/dashboard/:userId`            | all users           | Returns all information for the dashboard          |


#### Stripe Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| POST   | `/stripe`                       | owners              |                                                    |
| PUT    | `/stripe`                       | owners              |                                                    |


#### Hours of Operation Routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| GET    | `/hours-of-operation/:orgId`    | all users           |                                                    |
| PUT    | `/hours-of-operation/:hourId`   | owners, supervisors |                                                    |


#### Invites routes

| Method | Endpoint                        | Access Control      | Description                                        |
|--------|---------------------------------|---------------------|----------------------------------------------------|
| POST   | `/invites/invite-supervisor`    | owners              |                                                    |
| POST   | `/invites/invite-employee`      | owners, supervisors |                                                    |
| POST   | `/invites/register/:inviteId`   | none                | Register in response to an invite.                 |

