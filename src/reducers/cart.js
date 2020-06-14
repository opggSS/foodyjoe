import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT_ITEM,
  INCREMENT_ITEM,
  REMOVE_ITEM,
} from '../actions/types'

const initialState = {
  totalPrice: 0,
  totalQuantity : 0,
  vendorId: null,
  vendorName: null,
  vendorImage: null,
  dishes: []
}

export default (state = initialState, action) => {
  let selectedDish = {}
  let dishes = {}
  switch (action.type) {
    case ADD_TO_CART:
      return {
        totalPrice: state.totalPrice + action.payload.dishPrice * action.payload.quantity,
        totalQuantity: state.totalQuantity + action.payload.quantity,
        vendorId: action.payload.vendorId,
        vendorImage:action.payload.vendorImage ,
        vendorName: action.payload.vendorName ,
        dishes: [
          ...state.dishes,
          action.payload
        ]
      }
    case CLEAR_CART:
      return initialState
    case REMOVE_ITEM:
      if (state.dishes.length === 1) return initialState
      dishes = state.dishes.filter((dish) => dish.cartItemId !== action.payload)
      selectedDish = state.dishes.find((dish) => dish.cartItemId === action.payload)
      return {
        ...state,
        totalPrice: state.totalPrice - selectedDish.dishPrice,
        dishes: dishes
      }
    case INCREMENT_ITEM:
      selectedDish = state.dishes.find((dish) =>  dish.cartItemId === action.payload.cartItemId)
      dishes = state.dishes.map(dish => {
        if (dish.cartItemId === action.payload.cartItemId) {
          return { ...dish, quantity: dish.quantity +  action.payload.quantity }
        }
        else {
          return dish
        }
      })
      return {
        ...state,
        totalPrice: state.totalPrice + selectedDish.dishPrice,
        totalQuantity: state.totalQuantity + 1,
        dishes: dishes
      }
    case DECREMENT_ITEM:
      selectedDish = state.dishes.find((dish) => dish.cartItemId === action.payload)
      dishes = state.dishes.map(dish => {
        if (dish.cartItemId === action.payload) {
          return { ...dish, quantity: dish.quantity -1 }
        }
        else {
          return dish
        }
      })
      return {
        ...state,
        totalPrice: state.totalPrice - selectedDish.dishPrice,
        totalQuantity: state.totalQuantity -1 ,
        dishes: dishes
      }
    default:
      return state
  }
}