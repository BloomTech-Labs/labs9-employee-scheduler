### API Documentation


#### Organization Routes

GET `/organizations/:id`

Returns the information for an organization. 

Access control: all users.

Response: 

```
{
  "id": "9126df31-2607-4166-9c0c-d0a300c59c62",
  "name": "Cadence",
  "description": "Adipisci beatae amet qui sed porro totam voluptates voluptatem.",
  "paid": null,
  "customer_id": null,
  "subscription_id": null
}
```

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

GET `/users/` --> DEPRECATE?

Get all users.

Access control



#### Availability Routes

#### Time Off Request Routes

#### Events Routes

#### Dashboard Routes

#### Stripe Routes

#### Hours of Operation Routes

#### Invites routes

