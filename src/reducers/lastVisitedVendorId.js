import { SET_LAST_VISITED_VENDOR } from '../actions/types'

export default (state = null, action) => {
  switch (action.type) {
    case SET_LAST_VISITED_VENDOR:
      return action.payload
    default: return state
  }
}