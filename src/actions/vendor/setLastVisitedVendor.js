import {SET_LAST_VISITED_VENDOR} from '../types'

//pass vendor Id to payload
export const setLastVisitedVendor = (payload) =>{
  return (dispatch) =>{
    dispatch({
      type:SET_LAST_VISITED_VENDOR,
      payload: payload
    })
  }
}
