import { REGISTER_AS_OWNER_SUCCESS, REGISTER_AS_OWNER_FAIL } from '../actions'

const initialState = {
  outcome: '',
  error: ''
}

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_AS_OWNER_SUCCESS:
      return { ...state, outcome: 'success' }
    case REGISTER_AS_OWNER_FAIL:
      return { ...state, outcome: 'fail' }
    default:
      return state
  }
}
