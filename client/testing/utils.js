import React from 'react'
import { render } from 'react-testing-library'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../src/reducers'
import { Provider } from 'react-redux'

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

function renderWithRedux(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(thunk))
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  }
}

function renderWithReduxAndRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(thunk))
  } = {}
) {
  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>{ui}</Provider>
      </Router>
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  }
}
export { renderWithRouter, renderWithRedux, renderWithReduxAndRouter }
