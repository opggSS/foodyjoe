import { SET_LAST_VISITED_VENDOR, GET_ALL_VENDORS } from '../types'

//pass vendor Id to payload
export const setLastVisitedVendor = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_LAST_VISITED_VENDOR,
      payload: payload
    })
  }
}

export const getAllVendors = (payload) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_VENDORS,
      payload: payload
    })
  }
}
