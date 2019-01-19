import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT,
  RESET_AUTH_STATE,
  AUTH_INIT
} from '../actions'

const initialState = {
  user: null,
  token: '',
  error: '',
  userDidLogout: false // tells app.js to redirect if logout action is triggered
}
//puts a user and token on state
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_INIT:
      return { ...state, error: '', userDidLogout: false }
    case AUTH_SUCCESS:
      return { ...state, ...action.payload }
    case AUTH_FAIL:
      return { ...state, error: action.payload.error }
    case LOGOUT:
      return { ...initialState, userDidLogout: true }
    case RESET_AUTH_STATE:
      return initialState
    default:
      return state
  }
}
