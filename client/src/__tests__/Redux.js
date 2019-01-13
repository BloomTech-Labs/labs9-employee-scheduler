import React from 'react'
import { createStore } from 'redux'
import { render } from 'react-testing-library'
import reducer from '../reducers'
import { Provider } from 'react-redux'

export function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  }
}

const TestComponent = () => <p>Test</p>

const mockCallback = jest.fn()
renderWithRedux(<TestComponent />)

describe('setup redux for testing', () => {
  it('sets up redux to be exported for testing', () => {
    expect(mockCallback.mock.calls.length).toBe(0)
  })
})
