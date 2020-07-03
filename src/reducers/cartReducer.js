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
  let vendor = null
  let totalPrice = 0
  
  switch (action.type) {
    case ADD_TO_CART:
      vendor = payload.vendor
      dishes = state[vendor] ? state[vendor].dishes : []
      totalPrice =(payload.dish.price * payload.quantity) + (state[vendor] ? state[vendor].totalPrice : 0)
      return {
        ...state,
        [vendor]: {
          ...state[vendor],
          // cart total price from a single vendor
          totalPrice:  Math.round(totalPrice * 100) / 100,
          // total items ordered from a single vendor
          quantity: state[vendor] ? state[vendor].quantity + payload.quantity : payload.quantity,
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
      vendor = payload.vendor
      if (state[vendor].dishes.length === 1) {
        let newState = { ...state }
        delete newState[vendor]
        return newState
      }
      dishes = state[vendor].dishes.filter((dish) => dish.cartItemId !== payload.cartItemId)
      selectedDish = state[vendor].dishes.find((dish) => dish.cartItemId === payload.cartItemId)
      totalPrice = state[vendor].totalPrice - selectedDish.price
      return {
        ...state,
        [vendor]: {
          ...state[vendor],
          totalPrice: Math.round(totalPrice*100)/100,
          dishes: dishes,
          quantity: state[vendor].quantity - 1,
        }
      }
    case INCREMENT_ITEM:
      vendor = payload.vendor
      selectedDish = state[vendor].dishes.find((dish) => dish.cartItemId === payload.cartItemId)
      totalPrice = state[vendor].totalPrice + selectedDish.price

      dishes = state[vendor].dishes.map(dish => {
        if (dish.cartItemId === payload.cartItemId) {
          return { ...dish, quantity: dish.quantity + payload.quantity }
        }
        else {
          return dish
        }
      })
      return {
        ...state,
        [vendor]: {
          ...state[vendor],
          totalPrice: Math.round(totalPrice*100)/100,
          quantity: state[vendor].quantity + 1,
          dishes: dishes
        }
      }
    case DECREMENT_ITEM:
      vendor = payload.vendor
      selectedDish = state[vendor].dishes.find((dish) => dish.cartItemId === payload.cartItemId)
      totalPrice = state[vendor].totalPrice - selectedDish.price
      dishes = state[vendor].dishes.map(dish => {
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
        [vendor]: {
          ...state[vendor],
          totalPrice: Math.round(totalPrice*100)/100,
          quantity: state[vendor].quantity - 1,
          dishes: dishes
        }
      }
    case CLEAR_CART_BY_VENDOR_ID:
      vendor = payload.vendor
      const newState = {...state}
      delete newState[vendor]
      return {
        ...newState,
      }

    default:
      return state
  }
}