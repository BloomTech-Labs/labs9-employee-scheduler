import { AUTH_SUCCESS, AUTH_FAIL, LOGOUT, RESET_AUTH_STATE } from '../actions'

const initialState = {
  user: null,
  token: '',
  error: '',
  userDidLogout: false // tells app.js to redirect if logout action is triggered
}
//puts a user and token on state
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, ...action.payload, error: '', userDidLogout: false }
    case AUTH_FAIL:
      return { ...state, error: action.payload.error, userDidLogout: false }
    case LOGOUT:
      return { ...initialState, userDidLogout: true }
    case RESET_AUTH_STATE:
      return initialState
    default:
      return state
  }
}
