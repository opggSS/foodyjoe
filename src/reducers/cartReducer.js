import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT_ITEM,
  INCREMENT_ITEM,
  REMOVE_ITEM,
  CLEAR_CART_BY_VENDOR_ID
} from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  let selectedDish = {}
  let dishes = {}
  const {payload} = action 
  let vendorId = null
  let totalPrice = 0
  
  switch (action.type) {
    case ADD_TO_CART:
      vendorId = payload.vendorId
      dishes = state[vendorId] ? state[vendorId].dishes : []
      totalPrice =(payload.dish.price * payload.quantity) + (state[vendorId] ? state[vendorId].totalPrice : 0)
      return {
        ...state,
        [vendorId]: {
          ...state[vendorId],
          // cart total price from a single vendor
          totalPrice:  Math.round(totalPrice * 100) / 100,
          // total items ordered from a single vendor
          quantity: state[vendorId] ? state[vendorId].quantity + payload.quantity : payload.quantity,
          // dishes details ordered from a single vendor
          dishes: [
            ...dishes,
            payload.dish
          ]
        }
      }
    case CLEAR_CART:
      return initialState
    case REMOVE_ITEM:
      vendorId = payload.vendorId
      if (state[vendorId].dishes.length === 1) {
        let newState = { ...state }
        delete newState[vendorId]
        return newState
      }
      dishes = state[vendorId].dishes.filter((dish) => dish.cartItemId !== payload.cartItemId)
      selectedDish = state[vendorId].dishes.find((dish) => dish.cartItemId === payload.cartItemId)
      totalPrice = state[vendorId].totalPrice - selectedDish.price
      return {
        ...state,
        [vendorId]: {
          ...state[vendorId],
          totalPrice: Math.round(totalPrice*100)/100,
          dishes: dishes,
          quantity: state[vendorId].quantity - 1,
        }
      }
    case INCREMENT_ITEM:
      vendorId = payload.vendorId
      selectedDish = state[vendorId].dishes.find((dish) => dish.cartItemId === payload.cartItemId)
      totalPrice = state[vendorId].totalPrice + selectedDish.price

      dishes = state[vendorId].dishes.map(dish => {
        if (dish.cartItemId === payload.cartItemId) {
          return { ...dish, quantity: dish.quantity + payload.quantity }
        }
        else {
          return dish
        }
      })
      return {
        ...state,
        [vendorId]: {
          ...state[vendorId],
          totalPrice: Math.round(totalPrice*100)/100,
          quantity: state[vendorId].quantity + 1,
          dishes: dishes
        }
      }
    case DECREMENT_ITEM:
      vendorId = payload.vendorId
      selectedDish = state[vendorId].dishes.find((dish) => dish.cartItemId === payload.cartItemId)
      totalPrice = state[vendorId].totalPrice - selectedDish.price
      dishes = state[vendorId].dishes.map(dish => {
        if (dish.cartItemId === payload.cartItemId) {
          console.log({ ...dish, quantity: dish.quantity - 1 })
          return { ...dish, quantity: dish.quantity - 1 }
        }
        else {
          return dish
        }
      })
      return {
        ...state,
        [vendorId]: {
          ...state[vendorId],
          totalPrice: Math.round(totalPrice*100)/100,
          quantity: state[vendorId].quantity - 1,
          dishes: dishes
        }
      }
    case CLEAR_CART_BY_VENDOR_ID:
      vendorId = payload.vendorId
      const newState = {...state}
      delete newState[vendorId]
      return {
        ...newState,
      }

    default:
      return state
  }
}