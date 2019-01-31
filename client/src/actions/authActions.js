import axios from 'axios'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'

export const AUTH_INIT = 'AUTH_INIT'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const LOGOUT = 'LOGOUT'
export const RESET_AUTH_STATE = 'RESET_AUTH_STATE'
export const UNREGISTERED_ACCOUNT = 'UNREGISTERED_ACCOUNT'
export const LOGOUT_IN_PLACE = 'LOGOUT_IN_PLACE'

const baseURL = process.env.REACT_APP_SERVER_URL

//puts token on headers for the backend
export const authenticate = () => async dispatch => {
  dispatch({ type: AUTH_INIT })
  // wrap in try/catch to catch firebase errors
  try {
    // try to get current user from firebase
    const { currentUser } = firebase.auth()

    // if currentUser is defined, getIdToken for firebase then verify with server
    if (currentUser) {
      const idToken = await currentUser.getIdToken(/* forceRefresh */ false)

      axios
        .post(`${baseURL}/users/current`, null, {
          headers: { authorization: idToken }
        })
        .then(res => {
          dispatch({
            type: AUTH_SUCCESS,
            payload: { user: res.data, token: idToken }
          })
        })
        .catch(err => {
          // a 404 indicates successful authentication but that the account has not registered
          if (err.response && err.response.status === 404) {
            return dispatch({ type: UNREGISTERED_ACCOUNT })
          }
          // if server verficiation otherwise fails, dispatch an error
          return dispatch({
            type: AUTH_FAIL,
            payload: { error: 'server error' }
          })
        })
    } else {
      // if firebase does not have a current user logged in, dispatch an error
      dispatch({ type: AUTH_FAIL, payload: { error: 'no user info' } })
    }
  } catch (error) {
    // if any uncaught errors in login async process, dispatch an error
    dispatch({ type: AUTH_FAIL, payload: { error: 'firebase error' } })
  }
}

export const updateUserSettings = token => async dispatch => {
  axios
    .post(`${baseURL}/users/current`, null, {
      headers: { authorization: token }
    })
    .then(res => {
      dispatch({
        type: AUTH_SUCCESS,
        payload: { user: res.data }
      })
    })
    .catch(err => console.log(err))
}

export const logout = () => async dispatch => {
  try {
    await firebase.auth().signOut()
    dispatch({ type: LOGOUT })
  } catch (error) {
    console.log('error logging out')
  }
}

export const resetAuthState = () => ({
  type: RESET_AUTH_STATE
})

export const logoutInPlace = () => async dispatch => {
  try {
    await firebase.auth().signOut()
    dispatch({ type: LOGOUT_IN_PLACE })
  } catch (error) {
    console.log('error logging out')
  }
}
