import { CREATE_ORDER_SUCCESS, CREATE_ORDER_ERROR , SET_ORDER_DETAIL } from '../actions/types'

const initialState = null
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_SUCCESS:
      return null
    case CREATE_ORDER_ERROR:
      return state
    case SET_ORDER_DETAIL :
      return action.payload
    default:
      return state
  }
}

export default orderReducer