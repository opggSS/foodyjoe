import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS,
  CREATE_USER_SUCCESS
} from '../actions/types'

const initialState = {
  authError: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
 
    case SIGN_IN_FAIL:
      console.log(action.payload)
      const errorMsg = action.payload.error
      return {
        ...state,
        authError: `login failed: ${errorMsg}`
      }
    case SIGN_IN_SUCCESS:
      console.log('login success')
      return {
        ...state,
        authError:null,
        
      }
    case SIGN_OUT_SUCCESS :
      return {
        ...state
      }
    case CREATE_USER_SUCCESS:
      return {
        ...state
      }
    default:
      return state
  }
}

export default authReducer