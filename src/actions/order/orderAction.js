import { CREATE_ORDER_SUCCESS, CLEAR_CART_BY_VENDOR_ID, CREATE_ORDER_ERROR, SET_ORDER_DETAIL } from '../types'

//pass vendor Id to payload
export const createOrder = (payload) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const history = payload.history;
    delete payload.history
    firestore.collection('orders').add({
      ...payload,
      createdAt: new Date()
    }).then(() => {
      console.log(payload)
      dispatch({
        type: CREATE_ORDER_SUCCESS
      })
      dispatch({
        type: CLEAR_CART_BY_VENDOR_ID,
        payload: { vendorId: payload.vendorId }
      })
    
      history.push('/')
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
