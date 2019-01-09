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
  it('routes to calendar on link click', () => {
    const { getByText, container } = render(
      <Router>
        <App />
      </Router>
    )
    const leftClick = { button: 0 }
    fireEvent.click(getByText(/calendar/i), leftClick)
    expect(container.innerHTML).toMatch('Calendar')
  })
  it('routes to Employees on link click', () => {
    const { getByText, container } = render(
      <Router>
        <App />
      </Router>
    )
    const leftClick = { button: 0 }
    fireEvent.click(getByText(/employee/i), leftClick)
    expect(container.innerHTML).toMatch('Employees')
  })
  it('routes to Create Schedule on link click', () => {
    const { getByText, container } = render(
      <Router>
        <App />
      </Router>
    )
    const leftClick = { button: 0 }
    fireEvent.click(getByText(/schedule/i), leftClick)
    expect(container.innerHTML).toMatch('Schedule')
  })
  it('routes to Settings on link click', () => {
    const { getByText, container } = render(
      <Router>
        <App />
      </Router>
    )
    const leftClick = { button: 0 }
    fireEvent.click(getByText(/settings/i), leftClick)
    expect(container.innerHTML).toMatch('Settings')
  })
})
