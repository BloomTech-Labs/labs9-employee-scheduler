# Cadence
LOGO
BADGES

[![Netlify Status](https://api.netlify.com/api/v1/badges/1f33c851-d544-41c1-adc3-d82975d87cff/deploy-status)](https://app.netlify.com/sites/cadence/deploys)

Cadence is an employee shift scheduling SaaS for small-to-medium businesses. In this document, you will find everything you need to know about this open-source software project. <br><br>

Front-end Deployment: https://cadence.netlify.com/ <br>
Back-end Deployment: https://cadence-api.herokuapp.com/<br>
Wireframe: https://balsamiq.cloud/snv27r3/p1rv5r3

## Table of Contents
- [Team](#team)
- [Motivation](#Motivation)
- [Features](#Features)
- [Installation](#Installation)
- [Testing](#Testing)
- [API](#API)
- [Contributing](#Contributing)

### Team (in alphabetical order)
- Kamry Bowman
- Rahul Desai
- Adam Hinckley
- Carlos Lantigua
- Samuel Machat

### Motivation

Cadence was created to solve modern shift management problems. Maintaining absolute visibility over your companies schedule can be a difficult task, even with spreadsheets. Cadence is an intiuitive and easy to use application that will do all of the heavy lifting for you. Just register at [https://cadence.netlify.com], create your company and take our demo for a spin. Drag and drop demo employees and interact with their availabilities. Approve and deny their paid time off requests, change your hours of operations and much more. When you're done, feel free to remove them and begin adding your employees.

### Features

● Secure User Authentication using Google Firebase
● Bill pay services utilizing Stripe payment
● Drag & Drop Calendar for interactive and intuitive employee shifts management
● Create your organization and add employees
● Supervisor dashboard
● Visibility and full control over your hours of operation
● Seemlessly approve, deny and request PTO


### Installation
To install the application in a local dev environment, you can run `yarn local` from the root of the folder. This will install all dependencies and run migrations and seeds for local database.
To install, you will need two environment files:
in the `./` you will need a `.env` file
in the `./client` you will a `.env.development` file

for the contents of these files, reference the channel

### Using the App

HIGH LEVEL INSTRUCTIONS HERE? MAY BE TEXT WE ALSO HAVE AVAILABLE ON SITE

### API
API is protected by firebase authentication. A valid JWT must be included on a request header under the 'authorization' key in order for a request to be accepted.

#### Users
Uers are structured as follows:
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  first_name: STRING
  last_name: STRING
  role: STRING [ 'owner', 'supervisor', 'employee' ]
  email: STRING
  phone: STRING

- GET /users: Returns all users
- GET /users/:id: Returns all users for an organization
- GET /users/current: Returns user information for currently authorized user
- POST /users: Creates a new user. Must have permission to create a user for the given organization. Returns the id of the new resource.
- PUT /users/:id: Receives a changes object on the body of the request, and merges into the user if possible. Returns the updated resource.

### Testing
This library uses Jest for testing. For the server side, we make use of Supertest, and for the client side, we make use of the React-Testing-Library.

Tests can be run in the server by moving into the root, and using `yarn test`. Tests can be run in the client by moving into `/client` and running `yarn test`.

### Contributing
Contributions are welcome. Please create an Issue if there is a bug or feature request you are interested in adding to the project. If you would like to implement the Pull request for this Issue yourself, please request permission in the Issue commentary and affirm from a Maintainer that you can proceed. Once confirmed, assign yourself the Issue in Github.

Pull requests are made via the git feature branch workflow described [here](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Once you are assigned the Issue, you can clone the repo locally, and begin working on the feature branch.

As you implement the test, please ensure you are running tests in both the server and client as described in the testing section. If you are implementing new features, please introduce well-thought out unit/integration tests as needed to ensure the feature works properly. Please also ensure you are running eslint, and eliminating any linting errors before attempting to create a pull request. Please also run Prettier, to ensure you are meeting the formatting standards for this project

Once your feature has been finished, please use `git push -u origin *feature-name*` to create the branch on the remote repository, then create the Pull request in github. As part of the Pull request, please fill out the [pull request template](pull_request_template.md) (this should auto-populate in your pull request). Once completed, you may create your Pull request. A review from a contributor and ultimate merge approval by an admin will be required. If there are requests raised in the review, please address them.

Thanks for participating!