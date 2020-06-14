import {INCREMENT_ITEM} from './types'

export const increment = (payload) =>{
  return (dispatch) =>{
    dispatch({
      type:INCREMENT_ITEM,
      payload: payload
    })
  }
}