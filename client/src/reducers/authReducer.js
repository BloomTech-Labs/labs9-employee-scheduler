import { AUTH_SUCCESS, AUTH_FAIL, LOGOUT } from '../actions'

const initialState = {
  user: null,
  token: '',
  error: ''
}
//puts a user and token on state
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, ...action.payload, error: '' }
    case AUTH_FAIL:
      return { ...state, error: action.payload.error }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
