import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { renderWithRouter } from '../../testing/utils'
import Register from '../components/Register'

const setup = () => {
  const utils = renderWithRouter(<Register />)
  const firstName = utils.getByLabelText('first-name')
  const lastName = utils.getByLabelText('last-name')
  const email = utils.getByLabelText('email')
  const phoneNumber = utils.getByLabelText('phone')
  const organization = utils.getByLabelText('organization')
  return {
    firstName,
    lastName,
    email,
    phoneNumber,
    organization,
    ...utils
  }
}

describe('Register Component', () => {
  it('should render the register form on sign up click', () => {
    const route = '/some-route'
    const { getByTestId } = renderWithRouter(<Register />, { route })
    expect(getByTestId('register-form').textContent).toBe('Register')
  })
  it('should take a first name value on input', () => {
    const { firstName } = setup()
    fireEvent.change(firstName, { target: { firstName: 'Carlos' } })
    expect(firstName.value).toBe('Carlos')
  })
})
