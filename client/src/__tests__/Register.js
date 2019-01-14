import React from 'react'
import { fireEvent } from 'react-testing-library'
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
  it('should take a first name value on input to state', () => {
    const { firstName } = setup()
    fireEvent.change(firstName, { target: { value: 'Carlos' } })
    expect(firstName.value).toBe('Carlos')
  })
  it('should take a last name value on input to state', () => {
    const { lastName } = setup()
    fireEvent.change(lastName, { target: { value: 'Lantigua' } })
    expect(lastName.value).toBe('Lantigua')
  })
  it('should take an email value on input to state', () => {
    const { email } = setup()
    fireEvent.change(email, { target: { value: 'email@email.com' } })
    expect(email.value).toBe('email@email.com')
  })
  it('should take a phone number with number values to state', () => {
    const { phoneNumber } = setup()
    fireEvent.change(phoneNumber, { target: { value: '999999999' } })
    expect(phoneNumber.value).toBe('999999999')
  })
  it('shoult take in an organization input to state', () => {
    const { organization } = setup()
    fireEvent.change(organization, { target: { value: 'McDonalds' } })
    expect(organization.value).toBe('McDonalds')
  })
})
