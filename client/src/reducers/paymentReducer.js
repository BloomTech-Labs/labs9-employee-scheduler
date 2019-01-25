import {
  FETCH_ORG_FROM_DB_SUCCESS,
  FETCH_ORG_FROM_DB_FAIL,
  LOGOUT
} from '../actions'

const initialState = { details: {}, error: '' }

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORG_FROM_DB_SUCCESS:
      return {
        details: action.payload,
        error: ''
      }
    case FETCH_ORG_FROM_DB_FAIL:
      return { ...initialState, error: 'fetching org failed' }
    case LOGOUT:
      return {
        details: {},
        error: ''
      }
    default:
      return state
  }
}
