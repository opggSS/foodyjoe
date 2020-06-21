import {CREATE_ORDER , CREATE_ORDER_ERROR} from '../actions/types'
const initialState = { }

const orderReducer = (state= initialState, action) =>{
  switch ( action.type ){
    case CREATE_ORDER :
      console.log('create order')
      return state
    case CREATE_ORDER_ERROR :
      console.log('error ' , action.err)
      return state
    default :
    return state
  }
}

export default orderReducer