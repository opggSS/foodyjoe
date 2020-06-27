import {GET_ALL_DISHES} from '../types'

export const getAllDishes = (payload) =>{
  return (dispatch) =>{
    dispatch({
      type:GET_ALL_DISHES,
      payload: payload
    })
  }
}