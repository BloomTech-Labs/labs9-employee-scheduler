import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import App from '../App'

afterEach(cleanup)

it('renders hello', () => {
  const { getByText } = render(<App />)
  expect(getByText('hello')).toBeInTheDocument()
})
