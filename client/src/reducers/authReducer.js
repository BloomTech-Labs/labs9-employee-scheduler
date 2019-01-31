import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT,
  RESET_AUTH_STATE,
  AUTH_INIT,
  UNREGISTERED_ACCOUNT,
  LOGOUT_IN_PLACE
} from '../actions'

const initialState = {
  user: null,
  token: '',
  error: '',
  userDidLogout: false, // tells app.js to redirect if logout action is triggered,
  isNewUser: false,
  fetchingAuth: false
}
//puts a user and token on state
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_INIT:
      return {
        ...state,
        error: '',
        userDidLogout: false,
        isNewUser: false
      }
    case AUTH_SUCCESS:
      return { ...state, ...action.payload }
    case AUTH_FAIL:
      return { ...state, error: action.payload.error }
    case UNREGISTERED_ACCOUNT:
      return { ...state, isNewUser: true }
    case LOGOUT:
      return { ...initialState, userDidLogout: true, isNewUser: false }
    case LOGOUT_IN_PLACE:
      return { ...initialState }
    case RESET_AUTH_STATE:
      return initialState
    default:
      return state
  }
}
