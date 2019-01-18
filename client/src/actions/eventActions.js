const axios = require('axios')

export const CREATE_EVENT = 'CREATE_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const EVENT_ERROR = 'EVENT_ERROR'
export const HOURS_UPDATED = 'HOURS_UPDATED'
export const HOURS_UPDATE_FAILED = 'HOURS_UPDATE_FAILED'
export const CLOSE_HOURS_UPDATED = 'CLOSE_HOURS_UPDATED'
export const OPEN_HOURS_UPDATED = 'OPEN_HOURS_UPDATED'
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

export const editOpenHours = (orgID, changes, token) => async dispatch => {
  try {
    const req = await axios.put(
      `${baseUrl}/hours-of-operation/${orgID}`,
      { open_time: changes, closed: 0 },
      { headers: { authorization: token } }
    )
    dispatch({ type: OPEN_HOURS_UPDATED, payload: req.data })
  } catch (err) {
    dispatch({ type: HOURS_UPDATE_FAILED })
  }
}

export const editCloseHours = (orgID, changes, token) => async dispatch => {
  try {
    const req = await axios.put(
      `${baseUrl}/hours-of-operation/${orgID}`,
      { close_time: changes, closed: 0 },
      { headers: { authorization: token } }
    )
    dispatch({ type: CLOSE_HOURS_UPDATED, payload: req.data })
  } catch (err) {
    dispatch({ type: HOURS_UPDATE_FAILED })
  }
}
