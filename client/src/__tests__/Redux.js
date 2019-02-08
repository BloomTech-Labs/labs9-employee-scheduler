import React from 'react'
import { renderWithRedux } from '../../testingUtils'

const TestComponent = () => <p>Test</p>

const mockCallback = jest.fn()
renderWithRedux(<TestComponent />)

describe('setup redux for testing', () => {
  it('sets up redux to be exported for testing', () => {
    expect(mockCallback.mock.calls.length).toBe(0)
  })
})
