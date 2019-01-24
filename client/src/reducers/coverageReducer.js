import { DISPLAY_COVERAGE } from '../actions'

const initialState = 0

export const coverageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_COVERAGE:
      return action.payload
    default:
      return state
  }
}
