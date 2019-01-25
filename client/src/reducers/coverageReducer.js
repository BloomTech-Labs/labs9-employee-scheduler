import { DISPLAY_COVERAGE, LOGOUT } from '../actions'

const initialState = 0

export const coverageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_COVERAGE:
      return action.payload
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
