import {DECREMENT_ITEM} from '../types'

export const decrement = (payload) =>{
  return (dispatch) =>{
    dispatch({
      type:DECREMENT_ITEM,
      payload: payload
    })
  }
}