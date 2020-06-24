import { CREATE_ORDER, CLEAR_CART_BY_VENDOR_ID } from '../types'
import { CREATE_ORDER_ERROR } from '../types'

//pass vendor Id to payload
export const createOrder = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    const history = payload.history;
    delete payload.history
    firestore.collection('orders').add({
      ...payload,
      customerId: '123',
      createdAt: new Date()
    }).then(() => {
      dispatch({
        type: CREATE_ORDER,
        payload: payload
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

