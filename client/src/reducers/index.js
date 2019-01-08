import { combineReducers } from 'redux'

const tempReducer = (state = [], action) => {
  switch (action.type) {
    case 'temp case':
      return state
    default:
      return state
  }
}

export default combineReducers({ tempReducer })
