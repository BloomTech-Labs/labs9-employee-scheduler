import axios from 'axios'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'
import { authenticate } from './'

export const REGISTER_AS_OWNER_SUCCESS = 'REGISTER_AS_OWNER_SUCCESS'
export const REGISTER_AS_OWNER_FAIL = 'REGISTER_AS_OWNER_FAIL'

export const SET_REDIRECT_FLAG_TO_TRUE = 'SET_REDIRECT_FLAG_TO_TRUE'
export const SET_REDIRECT_FLAG_TO_FALSE = 'SET_REDIRECT_FLAG_TO_FALSE'

const baseURL = process.env.REACT_APP_SERVER_URL

export const registerAsOwner = packet => async dispatch => {
  const idToken = await firebase.auth().currentUser.getIdToken(false)

  axios
    .post(`${baseURL}/users/register/owner/`, packet, {
      headers: { authorization: idToken }
    })
    .then(res => {
      dispatch({
        type: REGISTER_AS_OWNER_SUCCESS,
        payload: res.data
      })
      dispatch(authenticate())
      dispatch(setRedirectFlagToTrue())
    })
    .catch(error => {
      dispatch({ type: REGISTER_AS_OWNER_FAIL })
    })
}

export const setRedirectFlagToTrue = () => ({
  type: SET_REDIRECT_FLAG_TO_TRUE
})

export const setRedirectFlagToFalse = () => ({
  type: SET_REDIRECT_FLAG_TO_FALSE
})
