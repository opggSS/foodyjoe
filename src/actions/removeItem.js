import {REMOVE_ITEM} from './types'

export const removeItem = (payload) =>{
  return (dispatch) =>{
    dispatch({
      type:REMOVE_ITEM,
      payload: payload
    })
  }
}