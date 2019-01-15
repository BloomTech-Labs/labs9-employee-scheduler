import axios from 'axios'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'

const baseURL = process.env.REACT_APP_SERVER_URL

//puts token on headers for the backend
export const authenticate = () => async dispatch => {
  // wrap in try/catch to catch firebase errors
  try {
    // try to get token from firebase
    const idToken = await firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ false)

    if (idToken) {
      axios
        .post(`${baseURL}/users/current`, null, {
          headers: { authorization: idToken }
        })
        .then(res => {
          console.log(res.data)
          dispatch({
            type: AUTH_SUCCESS,
            payload: { user: res.data, token: idToken }
          })
        })
        .catch(err => {
          dispatch({ type: AUTH_FAIL }) // server error
        })
    } else {
      dispatch({ type: AUTH_FAIL }) // no token
    }
  } catch (error) {
    dispatch({ type: AUTH_FAIL }) // firebase error
  }
}
