import {CLEAR_CART_BY_VENDOR_ID} from '../types'

export const clearCartByVendorId = (payload) =>{
  return (dispatch) =>{
    dispatch({
      type:CLEAR_CART_BY_VENDOR_ID,
      payload: payload
    })
  }
}