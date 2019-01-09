import React from 'react'
import { render } from 'react-testing-library'
import App from '../App'

it('renders hello', () => {
  const { getByText } = render(<App />)
  expect(getByText('hello')).toBeInTheDocument()
})
