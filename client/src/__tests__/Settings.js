import React from 'react'
import { fireEvent } from 'react-testing-library'
import { renderWithRouter } from '../../testing/utils'
import Settings from '../components/Settings'

const setup = () => {
  const utils = renderWithRouter(<Settings />)
  const email = utils.getByLabelText('email')
  const phone = utils.getByLabelText('tel')
  const emailpref = utils.getByLabelText('emailpref')
  const phonepref = utils.getByLabelText('phonepref')

  return {
    email,
    phone,
    emailpref,
    phonepref,
    ...utils
  }
}

describe('Settings Component', () => {
  it('should render the settings header', () => {
    const route = '/settings'
    const { getByTestId } = renderWithRouter(<Settings />, { route })
    expect(getByTestId('settings').textContent).toBe('Settings')
  })
  it('should take in an email input value', () => {
    const { email } = setup()
    fireEvent.change(email, { target: { value: 'carlos@coolguy.com' } })
    expect(email.value).toBe('carlos@coolguy.com')
  })
  it('should take a phone number with number values to state', () => {
    const { phone } = setup()
    fireEvent.change(phone, { target: { value: '999999999' } })
    expect(phone.value).toBe('999999999')
  })
  it('should take in an emailpref input value', () => {
    const { emailpref } = setup()
    fireEvent.change(emailpref, { target: { value: 'carlos@coolguy.com' } })
    expect(emailpref.value).toBe('carlos@coolguy.com')
  })
  it('should take a phonepref number values to state', () => {
    const { phonepref } = setup()
    fireEvent.change(phonepref, { target: { value: '999999999' } })
    expect(phonepref.value).toBe('999999999')
  })
})
