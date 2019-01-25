import {
  REGISTER_AS_OWNER_SUCCESS,
  REGISTER_AS_OWNER_FAIL,
  REGISTER_RESET,
  SET_REDIRECT_FLAG_TO_TRUE,
  SET_REDIRECT_FLAG_TO_FALSE,
  LOGOUT
} from '../actions'

const initialState = {
  outcome: '',
  error: '',
  redirect: false
}

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_AS_OWNER_SUCCESS:
      return { ...state, outcome: 'success' }
    case REGISTER_AS_OWNER_FAIL:
      return { ...state, outcome: 'fail' }
    case REGISTER_RESET:
      return { ...initialState }
    case SET_REDIRECT_FLAG_TO_TRUE:
      return { ...state, redirect: true }
    case SET_REDIRECT_FLAG_TO_FALSE:
      return { ...state, redirect: false }
    case LOGOUT:
      return {
        outcome: '',
        error: '',
        redirect: ''
      }
    default:
      return state
  }
}
