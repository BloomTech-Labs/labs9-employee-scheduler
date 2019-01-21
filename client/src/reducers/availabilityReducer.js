import { UPDATE_AVAILABILITY, UPDATE_AVAILABILITY_FAIL } from '../actions'

const initialState = {
  availability: {},
  error: ''
}

export const availabilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AVAILABILITY:
      return {
        availability: action.payload
      }
    case UPDATE_AVAILABILITY_FAIL:
      return { error: 'Failed to get availability ' }
    default:
      return state
  }
}
