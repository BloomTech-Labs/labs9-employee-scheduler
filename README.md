# Cadence
LOGO
BADGES

Cadence is an employee shift scheduling SaaS for small-to-medium businesses. In this document, you will find everything you need to know about this open-source software project. <br><br>

Front-end Deployment: https://cadence.netlify.com/ <br>
Back-end Deployment: https://cadence-api.herokuapp.com/

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

Why does this product exist? How does a user access it?

### Features
What's it do?

### Installation
to install, you will need two environment files:
in the `./` you will need a `.env` file
in the `./client` you will a `.env.development` file

for the contents of these files, reference the channel

### Using the App

HIGH LEVEL INSTRUCTIONS HERE? MAY BE TEXT WE ALSO HAVE AVAILABLE ON SITE

### API
DETAIL ENDPOINTS HERE

### Testing
This library uses Jest for testing. For the server side, we make use of Supertest, and for the client side, we make use of the React-Testing-Library.

Tests can be run in the server by moving into the root, and using `yarn test`. Tests can be run in the client by moving into `/client` and running `yarn test`.

### Contributing
Contributions are welcome. Please create an Issue if there is a bug or feature request you are interested in adding to the project. If you would like to implement the Pull request for this Issue yourself, please request permission in the Issue commentary and affirm from a Maintainer that you can proceed. Once confirmed, assign yourself the Issue in Github.

Pull requests are made via the git feature branch workflow described [here](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Once you are assigned the Issue, you can clone the repo locally, and begin working on the feature branch.

As you implement the test, please ensure you are running tests in both the server and client as described in the testing section. If you are implementing new features, please introduce well-thought out unit/integration tests as needed to ensure the feature works properly. Please also ensure you are running eslint, and eliminating any linting errors before attempting to create a pull request. Please also run Prettier, to ensure you are meeting the formatting standards for this project

Once your feature has been finished, please use `git push -u origin *feature-name*` to create the branch on the remote repository, then create the Pull request in github. As part of the Pull request, please fill out the [pull request template](pull_request_template.md) (this should auto-populate in your pull request). Once completed, you may create your Pull request. A review from a contributor and ultimate merge approval by an admin will be required. If there are requests raised in the review, please address them.

Thanks for participating!