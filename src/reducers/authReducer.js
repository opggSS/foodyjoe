import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS,
  CREATE_USER_SUCCESS,
  SET_USER_INFO,
  CLEAR_USER_INFO
} from '../actions/types'

const initialState = {
  authError: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_FAIL:
      const errorMsg = action.payload
      return {
        ...state,
        authError: errorMsg
      }
    case SIGN_IN_SUCCESS:
      return {
        ...action.payload,
        authError: null,
      }
    case SIGN_OUT_SUCCESS:
      return {
        ...state
      }
    case SET_USER_INFO: {
      return {
        ...action.payload,
        authError:null
      }
    }
    case CREATE_USER_SUCCESS:
      return {
        ...state
      }
    case CLEAR_USER_INFO :
      return {
        authError: null,
      }
    default:
      return state
  }
}

export default authReducer