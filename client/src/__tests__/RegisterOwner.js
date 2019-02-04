import React from 'react'
import { fireEvent, waitForElement } from 'react-testing-library'
import { renderWithReduxAndRouter, setupStripeNode } from '../../testing/utils'
import { populateOrg } from '../../../database/utils/generateData'
import App from '../App'
import axios from 'axios'
import * as firebase from 'firebase/app'

// jest.mock('axios')
jest.mock('firebase/app')
jest.mock('firebase/auth')
jest.mock('react-ga')
jest.mock('axios')

setupStripeNode()

firebase.auth = jest.fn().mockImplementation(() => {
  return {
    onAuthStateChanged: cb => {
      cb()
      return () => {}
    },
    currentUser: {
      getIdToken: () => Promise.resolve('token'),
      email: 'email@email.com',
      displayName: 'John Smith'
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
axios.post.mockImplementation((path, body, { headers: { authorization } }) => {
  if (authorization === 'token') {
    return Promise.reject({ status: 404 })
  }
})

let utils

const setup = async () => {
  const utils = renderWithReduxAndRouter(<App />, { route: '/register' })

  await waitForElement(() => utils.getByText(/complete registration/i))

  return utils
}

describe('Register Component', () => {
  it('should render the register form on sign up click', async () => {
    utils = await setup()

    expect(utils.getByTestId('register-form').textContent).toBe(
      'Complete Registration'
    )
  })
  it('all inputs accept updates', async () => {
    const { getByLabelText } = await setup()

    const firstName = getByLabelText(/first name/i)
    fireEvent.change(firstName, { target: { value: 'Carlos' } })
    expect(firstName.value).toBe('Carlos')

    const lastName = getByLabelText(/last name/i)
    fireEvent.change(lastName, { target: { value: 'Lantigua' } })
    expect(lastName.value).toBe('Lantigua')

    const email = getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: 'goodEmail@email.com' } })
    expect(email.value).toBe('goodEmail@email.com')

    const testNum = '303-333-4343'
    const phone = getByLabelText(/contact number/i)
    fireEvent.change(phone, { target: { value: testNum } })
    expect(phone.value).toBe(testNum)

    const orgName = "McDonald's"
    const orgInput = getByLabelText(/Organization Name/i)
    fireEvent.change(orgInput, { target: { value: orgName } })
    expect(orgInput.value).toBe(orgName)
  })
})
