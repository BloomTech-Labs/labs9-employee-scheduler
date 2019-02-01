# ![logo](https://raw.githubusercontent.com/Lambda-School-Labs/labs9-employee-scheduler/master/client/src/img/cadence.png)

[![Netlify Status](https://api.netlify.com/api/v1/badges/1f33c851-d544-41c1-adc3-d82975d87cff/deploy-status)](https://app.netlify.com/sites/cadence/deploys)

Cadence is an employee shift scheduling SaaS for small-to-medium businesses. In this document, you will find everything you need to know about this open-source software project. <br><br>

Front-end Deployment: https://getcadence.co/<br>
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
| Members         |      GitHub   |  LinkedIn |
|-----------------|-------------  |------|
| Kamry Bowman    |  https://github.com/kamry-bowman | https://www.linkedin.com/in/kamry-bowman/ |
| Rahul Desai     |    https://github.com/rd825   |   https://www.linkedin.com/in/rdesai01/ |
| Adam Hinckley   | https://github.com/adamhinckley |    https://www.linkedin.com/in/adamhinckley/ |
| Carlos Lantigua | https://github.com/CLantigua2 |   https://www.linkedin.com/in/carlos-lantigua/ |
| Samuel Machat   | https://github.com/axolotl |    https://www.linkedin.com/in/samuel-machat/ |
 

### Motivation

Cadence is a B2B SaaS created to make shift scheduling quick and painless. Maintaining absolute visibility over your company's schedule can be a difficult task; spreadsheets and legacy software don't do the job. Cadence is an intuitive and easy-to-use application that will do the heavy lifting for you. Just register [here](https://getcadence.co/), create your company, and take our demo for a spin. Drag and drop demo employees to schedule them. Change their availabilities, approve or deny their time off requests, change your business' hours of operations, and much more. When you're done, feel free to remove them and begin adding your own employees. The technical design document / spec for this project is [here](https://github.com/Lambda-School-Labs/labs9-employee-scheduler/blob/master/docs/TDD.md).

### Features

- Secure User Authentication using Google Firebase
- Billing utilizing Stripe payment (including 14-day free trial)
- Drag & Drop Calendar for interactive and intuitive employee shift scheduling
- Create your organization and add employees by inviting them
- Supervisor dashboard to delegate responsibility
- Full visibility and control over your business' hours of operation
- Seamlessly approve, deny and request PTO


### Installation
To install the application in a local dev environment, you can run `yarn local` from the root of the folder. This will install all dependencies and run migrations and seeds for local database.
To install, you will need two environment files:
in the `./` you will need a `.env` file
in the `./client` you will a `.env.development` file

#### To spin up your own .env variables, you will need to do the following:

### Using the App
To start our app locally after completing the above installation, just run `yarn dev`. This will spin up the client on localhost:3000 and the server on localhost:9000. 

### API
Our API is protected by Firebase authentication. A valid JWT must be included on a request header under the 'authorization' key in order for a request to be accepted. In our Redux store, this is `auth.token` for a currently validated user. You can learn more about our API [here](https://github.com/Lambda-School-Labs/labs9-employee-scheduler/blob/master/docs/API.md). You can learn more about our data model [here](https://github.com/Lambda-School-Labs/labs9-employee-scheduler/blob/master/docs/data_model.md).

### Testing
This library uses Jest for testing. For the server side, we make use of Supertest, and for the client side, we make use of the React-Testing-Library.

Tests can be run in the server by moving into the root, and using `yarn test`. Tests can be run in the client by moving into `/client` and running `yarn test`.

### Contributing
Contributions are welcome. If you choose to contribute to this project, you agree to abide by our [Code of Conduct](https://github.com/Lambda-School-Labs/labs9-employee-scheduler/blob/master/docs/CODE_OF_CONDUCT.md). Please create an Issue if there is a bug or feature request you are interested in adding to the project. If you would like to implement the Pull request for this Issue yourself, please request permission in the Issue commentary and affirm from a Maintainer that you can proceed. Once confirmed, assign yourself the Issue in Github.

Pull requests are made via the git feature branch workflow described [here](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Once you are assigned the Issue, you can clone the repo locally, and begin working on the feature branch.

As you implement tests, please ensure you are running tests in both the server and client as described in the testing section. If you are implementing new features, please introduce well thought-out unit/integration tests as needed to ensure the feature works properly. Please also ensure you are running eslint using [our config](https://github.com/Lambda-School-Labs/labs9-employee-scheduler/blob/master/.eslintrc.js), and eliminating any linting errors before attempting to create a pull request. Please also run Prettier using [our config](https://github.com/Lambda-School-Labs/labs9-employee-scheduler/blob/master/.prettierrc), to ensure you are meeting the formatting standards for this project.

Once your feature has been finished, please use `git push -u origin *feature-name*` to create the branch on the remote repository, then create the Pull request in github. As part of the Pull request, please fill out the [pull request template](pull_request_template.md) (this should auto-populate in your pull request). Once completed, you may create your Pull request. A review from a contributor and ultimate merge approval by an admin will be required. If there are requests raised in the review, please address them.

Thanks for your interest in Cadence; we look forward to your feedback & participation! <br/>
—Kam, Rahul, Adam, Carlos, & Samuel
