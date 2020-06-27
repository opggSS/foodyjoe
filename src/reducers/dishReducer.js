import { GET_ALL_DISHES } from '../actions/types'

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_DISHES:
      return action.payload
    default: return state
  }
}