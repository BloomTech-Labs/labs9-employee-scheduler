import { AUTH_SUCCESS, AUTH_FAIL } from '../actions'

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
      return { ...state, error: 'authentication failed' }
    default:
      return state
  }
}
