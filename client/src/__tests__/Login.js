import React from 'react'
import App from '../App'
import {
  populateOrg,
  structureEmployees
} from '../../../database/utils/generateData'
import { fireEvent, waitForElement, getByText } from 'react-testing-library'
import { renderWithReduxAndRouter, setupStripeNode } from '../../testing/utils'

import * as axios from 'axios'
import * as firebase from 'firebase/app'
import * as ReactGA from 'react-ga'
jest.mock('axios')
jest.mock('firebase/app')
jest.mock('firebase/auth')
jest.mock('react-ga')

// mocking the firebaseui component since this needs to hit external urls internally
jest.mock('react-firebaseui/StyledFirebaseAuth', () => {
  const FirebaseUI = jest.fn(props => {
    const { uiConfig, firebaseAuth } = props
    const validUIConfig =
      uiConfig &&
      uiConfig.signInOptions &&
      uiConfig.signInOptions.every(option => option !== undefined)
    if (!validUIConfig || !firebaseAuth) {
      throw new Error('bad firebase config')
    }

    return (
      <div>
        <button>Sign in</button>
      </div>
    )
  })
  return FirebaseUI
})

// generate org with table structure
const org = populateOrg({ size: 4 })

// convert into nested employee data structure
const employees = structureEmployees(org)
const { users, events, hours, organization } = org
const user = users.find(user => user.role === 'owner')
user.cal_visit = false

describe('Login Component', () => {
  // it('should navigate to login for non-logged in user', async () => {
  //   setupStripeNode()
  //   // mock out axios authenticaton call to our server
  //   axios.get.mockImplementation((path, { headers: { authorization } }) => {
  //     if (authorization === 'token') {
  //       if (path.match(new RegExp(`/organizations/${organization.id}`))) {
  //         return Promise.resolve({ data: organization })
  //       }
  //       if (path.match(new RegExp(`/users/current`))) {
  //         return Promise.resolve({ data: user })
  //       }
  //     }
  //   })
  //   // mock out firebase auth
  //   firebase.auth = jest.fn().mockImplementation(() => {
  //     return {
  //       onAuthStateChanged: cb => {
  //         cb()
  //         return () => {}
  //       },
  //       currentUser: {
  //         getIdToken: () => Promise.reject({ status: 404 })
  //       }
  //     }
  //   })

  //   firebase.auth.GoogleAuthProvider = {
  //     PROVIDER_ID: '1'
  //   }
  //   firebase.auth.EmailAuthProvider = {
  //     PROVIDER_ID: '1'
  //   }

  //   // renders the App with both Redux and Router, with the route set
  //   // to the matching route for this component in App
  //   const { queryByText } = await renderWithReduxAndRouter(<App />, {
  //     route: `/login`
  //   })

  //   const loginButton = await waitForElement(() => queryByText(/sign in/i))
  //   expect(loginButton).not.toBeNull()
  // })

  it('should redirect away from Login for logged in user', async () => {
    setupStripeNode()
    // mock out firebase auth
    firebase.auth = jest.fn().mockImplementation(() => {
      return {
        onAuthStateChanged: cb => {
          cb()
          return () => {}
        },
        currentUser: {
          getIdToken: () => Promise.resolve('token')
        }
      }
    })

    firebase.auth.GoogleAuthProvider = {
      PROVIDER_ID: '1'
    }
    firebase.auth.EmailAuthProvider = {
      PROVIDER_ID: '1'
    }

    axios.get.mockImplementation((path, { headers: { authorization } }) => {
      if (authorization === 'token') {
        if (path.match(new RegExp(`/employees/${user.organization_id}`))) {
          return Promise.resolve({ data: employees })
        }
        if (
          path.match(new RegExp(`/hours-of-operation/${user.organization_id}`))
        ) {
          return Promise.resolve({ data: hours })
        }
        if (path.match(new RegExp(`/organizations/${user.organization_id}`))) {
          return Promise.resolve({ data: organization })
        }
        if (path.match(new RegExp(`/users/current`))) {
          return Promise.resolve({ data: user })
        }
      }
    })

    // renders the App with both Redux and Router, with the route set
    // to the matching route for this component in App
    const { queryByText, container } = await renderWithReduxAndRouter(<App />, {
      route: `/login`
    })

    await waitForElement(() => container.querySelector('.rbc-calendar'))

    expect([queryByText(/sign in/i), container]).toBeNull()
  })
})
