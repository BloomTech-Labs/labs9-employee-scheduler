import {
  OPEN_HOURS_UPDATED,
  CLOSE_HOURS_UPDATED,
  HOURS_UPDATE_FAILED,
  HOURS_FETCHED,
  HOURS_FETCHING_FAILED,
  HOURS_UPDATED
} from '../actions'

const initialState = {
  hours: [],
  error: ''
}

export const hoursReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOURS_FETCHED:
      return {
        hours: [...action.payload],
        error: ''
      }
    case HOURS_UPDATED: // set day to closed
      return {
        hours: action.payload,
        error: ''
      }
    case OPEN_HOURS_UPDATED:
      return {
        hours: { ...initialState, open_time: action.payload },
        error: ''
      }
    case CLOSE_HOURS_UPDATED:
      return {
        hours: { ...initialState, close_time: action.payload },
        error: ''
      }
    case HOURS_UPDATE_FAILED:
      return { ...initialState, error: 'update failed' }
    case HOURS_FETCHING_FAILED:
      return {
        ...initialState,
        error: 'fetching failed'
      }
    default:
      return state
  }
}
