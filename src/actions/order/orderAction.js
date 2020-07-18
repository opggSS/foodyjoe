import { CREATE_ORDER_SUCCESS, CLEAR_CART_BY_VENDOR_ID, CREATE_ORDER_ERROR, SET_ORDER_DETAIL,SET_LAST_VISITED_VENDOR } from '../types'

//pass vendor Id to payload
export const createOrder = (payload) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    delete payload.history
    firestore.collection('orders').add({
      ...payload,
      createdAt: new Date()
    }).then(() => {
      dispatch({
        type: CREATE_ORDER_SUCCESS
      })
      dispatch({
        type: CLEAR_CART_BY_VENDOR_ID,
        payload: { vendor: payload.vendor }
      })
      dispatch({
        type:SET_LAST_VISITED_VENDOR,
        payload: null
      })
      
    }).catch(err => {
      dispatch({
        type: CREATE_ORDER_ERROR,
        payload: err
      })
    })
  }
}

export const setOrderDetail = payload => {
  return dispatch => {
    dispatch({
      type: SET_ORDER_DETAIL,
      payload: payload
    })
  }
}
