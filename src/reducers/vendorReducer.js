
import { GET_ALL_VENDORS } from '../actions/types'

const initialState = []

const vendor = (state = initialState, action) => {

  switch (action.type) {
    case GET_ALL_VENDORS:
      return action.payload
    default:
      return state
  }
}

export default vendor