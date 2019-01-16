const axios = require('axios')

export const CREATE_EVENT = 'CREATE_EVENT'
export const EVENT_ERROR = 'EVENT_ERROR'

const baseUrl = process.env.REACT_APP_SERVER_URL

export const createEvent = event => async dispatch => {
  try {
    const req = await axios.post(`${baseUrl}/events`, event, {
      headers: { authorization: 'testing ' }
    })
  } catch (err) {
    dispatch({ type: EVENT_ERROR })
  }
}
