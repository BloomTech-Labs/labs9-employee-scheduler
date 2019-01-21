import {
  OPEN_HOURS_UPDATED,
  CLOSE_HOURS_UPDATED,
  HOURS_UPDATE_FAILED,
  HOURS_FETCHED,
  HOURS_FETCHING_FAILED,
  HOURS_UPDATED,
  HOURS_LOADING
} from '../actions'

const initialState = {
  loading: false,
  hours: [],
  error: ''
}

export const hoursReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOURS_LOADING:
      return {
        ...state,
        loading: true
      }
    case HOURS_FETCHED:
      return {
        ...state,
        hours: [...action.payload],
        loading: false,
        error: ''
      }
    case HOURS_UPDATED: // set day to closed
      return {
        ...state,
        hours: action.payload,
        loading: false,
        error: ''
      }
    case OPEN_HOURS_UPDATED:
      return {
        hours: state.hours.map((item, index) => {
          // if this is not the item I want to update, leave it alone
          if (index !== action.index) {
            return item
          }
          // else return the an updated value
          return {
            ...item,
            ...action.item
          }
        }),
        loading: false,
        error: ''
      }
    case CLOSE_HOURS_UPDATED:
      return {
        hours: { close_time: action.payload },
        loading: false,
        error: ''
      }
    case HOURS_UPDATE_FAILED:
      return {
        ...state,
        loading: false,
        error: 'update failed'
      }
    case HOURS_FETCHING_FAILED:
      return {
        ...state,
        loading: false,
        error: 'fetching failed'
      }
    default:
      return state
  }
}
