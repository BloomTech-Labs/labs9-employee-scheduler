import React from 'react'
import { render } from 'react-testing-library'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

function renderWithRouter(
  ui,
  // this argument initializes the page at root, to ensure Router loads
  // root routes properly
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  }
}

export { renderWithRouter }
