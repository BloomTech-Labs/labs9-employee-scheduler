const axios = require('axios')

export const CREATE_EVENT = 'CREATE_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const EVENT_ERROR = 'EVENT_ERROR'
export const HOURS_UPDATED = 'HOURS_UPDATED'
export const HOURS_UPDATE_FAILED = 'HOURS_UPDATE_FAILED'

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

export const editHoursOfOperations = ({ orgID, changes }) => async dispatch => {
  const { id } = orgID
  try {
    const req = await axios.put(
      `${baseUrl}/hours-of-operation/${id}`,
      changes,
      { headers: { authorization: 'testing' } }
    )
    dispatch({ type: HOURS_UPDATED, payload: req.data })
  } catch (err) {
    dispatch({ type: HOURS_UPDATE_FAILED })
  }
}
