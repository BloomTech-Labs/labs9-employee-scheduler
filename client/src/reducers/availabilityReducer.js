import {
  UPDATE_AVAILABILITY,
  UPDATE_AVAILABILITY_FAIL,
  GET_AVAILABILITY,
  GET_AVAILABILITY_FAIL,
  AVAILABILITY_LOADING
} from '../actions'

const initialState = {
  availability: [],
  error: ''
}

export const availabilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case AVAILABILITY_LOADING:
      return {
        ...state,
        loading: true
      }
    case UPDATE_AVAILABILITY:
      return {
        ...state,
        availability: state.availability.map(a => {
          console.log(a, action.payload)
          if (a.id === action.payload.id) {
            return action.payload
          } else {
            return a
          }
        })
      }
    case UPDATE_AVAILABILITY_FAIL:
      return { ...state, error: 'failed to load' }
    case GET_AVAILABILITY:
      return { availability: action.payload }
    case GET_AVAILABILITY_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}
