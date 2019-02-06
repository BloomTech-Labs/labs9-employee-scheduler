import React from 'react'
import App from '../App'
import { populateOrg } from '../../../database/utils/generateData'
import { fireEvent, waitForElement, getByText } from 'react-testing-library'
import { renderWithReduxAndRouter, setupStripeNode } from '../../testing/utils'

import * as axios from 'axios'
import * as firebase from 'firebase/app'
import * as ReactGA from 'react-ga'
jest.mock('axios')
jest.mock('firebase/app')
jest.mock('firebase/auth')
jest.mock('react-ga')

jest.mock('react-firebaseui/StyledFirebaseAuth', () => {
  const FirebaseUI = jest.fn(({ uiConfig }) => {
    const validUIConfig =
      uiConfig &&
      uiConfig.signOptions &&
      uiConfig.signOptions.every(option => option !== undefined)
    if (!validUIConfig) {
      throw new Error('bad firebase config')
    }

    return (
      <div>
        <button>Sign in with email</button>
      </div>
    )
  })
  return FirebaseUI
})

const { organization, users } = populateOrg({ size: 6 })
const user = users[0]

describe('Login Component', () => {
  let email, phone, emailpref, phonepref, utils
  beforeEach(() => {})

  it('should navigate to login for non-logged in user', async () => {
    // mock out firebase auth
    firebase.auth = jest.fn().mockImplementation(() => {
      return {
        onAuthStateChanged: cb => {
          cb()
          return () => {}
        },
        currentUser: {
          getIdToken: () => Promise.reject({ status: 404 })
        }
      }
    })

    firebase.auth.GoogleAuthProvider = {
      PROVIDER_ID: '1'
    }
    firebase.auth.EmailAuthProvider = {
      PROVIDER_ID: '1'
    }

    // mock out axios authenticaton call to our server
    axios.get.mockImplementation((path, { headers: { authorization } }) => {
      if (authorization === 'token') {
        if (path.match(new RegExp(`/organizations/${organization.id}`))) {
          return Promise.resolve({ data: organization })
        }
        if (path.match(new RegExp(`/users/current`))) {
          return Promise.resolve({ data: user })
        }
      }
    })
    // setup of document to play nice with Striple component
    setupStripeNode()

    // renders the App with both Redux and Router, with the route set
    // to the matching route for this component in App
    const { queryByText } = await renderWithReduxAndRouter(<App />, {
      route: `/login`
    })

    const loginComp = await waitForElement(() => queryByText(/sign on/i))
    expect(loginComp).not.toBeNull()
  })

  // it('should take a phonepref number values to state', async () => {
  //   const phonepref = await waitForElement(() => {
  //     return utils.getByLabelText(/phonepref/i)
  //   })
  //   fireEvent.change(phonepref, { target: { value: '999999999' } })
  //   expect(phonepref.value).toBe('999999999')
  // })
})
