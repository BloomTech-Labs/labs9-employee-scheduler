const axios = require('axios')

export const CREATE_EVENT = 'CREATE_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const EVENT_ERROR = 'EVENT_ERROR'
export const DELETE_EVENT = 'DELETE_EVENT'

const baseUrl = process.env.REACT_APP_SERVER_URL

export const createEvent = ({ employee, start }) => async dispatch => {
  try {
    const processed = {
      user_id: employee.id,
      start,
      end: new Date(start.getTime() + 1000 * 60 * 60)
    }
    const req = await axios.post(`${baseUrl}/events`, processed, {
      headers: { authorization: 'testing ' }
    })
    dispatch({ type: CREATE_EVENT, payload: req.data })
  } catch (err) {
    dispatch({ type: EVENT_ERROR })
  }
}

export const changeEvent = ({ event, changes }) => async dispatch => {
  const { id } = event
  try {
    const req = await axios.put(`${baseUrl}/events/${id}`, changes, {
      headers: { authorization: 'testing' }
    })
    dispatch({ type: UPDATE_EVENT, payload: req.data })
  } catch (err) {
    dispatch({ type: EVENT_ERROR })
  }
}

export const deleteEvent = ({ user_id, id }) => async dispatch => {
  try {
    await axios.delete(`${baseUrl}/events/${user_id}`, {
      headers: { authorization: 'testing' }
    })
    dispatch({
      type: DELETE_EVENT,
      payload: { user_id: user_id, event_id: id }
    })
  } catch (err) {
    dispatch({ type: EVENT_ERROR })
  }
}
