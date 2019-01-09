import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { BrowserRouter as Router } from 'react-router-dom'
import App from '../App'

describe('App component', () => {
  it('renders hello', () => {
    const { getByText } = render(
      <Router>
        <App />
      </Router>
    )
    expect(getByText('hello')).toBeInTheDocument()
  })
  it('routes to calendar', () => {
    const { getByText, container } = render(
      <Router>
        <App />
      </Router>
    )
    const leftClick = { button: 0 }
    fireEvent.click(getByText(/calendar/i), leftClick)
    expect(container.innerHTML).toMatch('Calendar')
  })
})
