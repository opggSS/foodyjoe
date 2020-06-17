import {CLEAR_CART} from '../types'

export const clearCart = (payload) =>{
  return (dispatch) =>{
    dispatch({
      type:CLEAR_CART,
      payload: payload
    })
  }
}