import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT_ITEM,
  INCREMENT_ITEM,
  REMOVE_ITEM,
} from '../actions/types'

const initialState = {
  // vendor:dish.vendor,
  // quantity: 1,
  // dish,
  // cartItemId: itemId
}

/// action = {payload , type}
export default (state = initialState, action) => {
  let selectedDish = {}
  let dishes = {}
  let vendorId
  switch (action.type) {
    case ADD_TO_CART:
      vendorId = action.payload.vendor.id
      dishes = state[vendorId] ? state[vendorId].dishes : []
      console.log(action.payload.dish)
      return {
        ...state,
        [vendorId]: {
          ...state[vendorId],
          // cart total price from a single vendor
          totalPrice: action.payload.dish.price * action.payload.quantity + (state[vendorId] ? state[vendorId].totalPrice : 0),
          // total items ordered from a single vendor
          quantity: state[vendorId] ? state[vendorId].quantity + action.payload.quantity : action.payload.quantity,
          //vendor Info
          vendor: state[vendorId] ? state[vendorId].vendor : action.payload.vendor,
          // dishes details ordered from a single vendor
          dishes: [
            ...dishes,
            action.payload.dish
          ]
        }

      }
    case CLEAR_CART:
      return initialState
    case REMOVE_ITEM:
      vendorId = action.payload.vendor.id
      if (state[vendorId].dishes.length === 1) {
        let newState = { ...state }
        delete newState[vendorId]
        return newState
      }
      dishes = state[vendorId].dishes.filter((dish) => dish.cartItemId !== action.payload.cartItemId)
      selectedDish = state[vendorId].dishes.find((dish) => dish.cartItemId === action.payload.cartItemId)
      return {
        ...state,
        [vendorId]: {
          ...state[vendorId],
          totalPrice: state[vendorId].totalPrice - selectedDish.price,
          dishes: dishes,
          quantity: state[vendorId].quantity - 1,
        }
      }
    case INCREMENT_ITEM:
      vendorId = action.payload.vendor.id
      selectedDish = state[vendorId].dishes.find((dish) => dish.cartItemId === action.payload.cartItemId)
      console.log(state[vendorId].dishes)

      dishes = state[vendorId].dishes.map(dish => {
        console.log(dish);
        if (dish.cartItemId === action.payload.cartItemId) {
          return { ...dish, quantity: dish.quantity + action.payload.quantity }
        }
        else {
          return dish
        }
      })
      return {
        ...state,
        [vendorId]: {
          ...state[vendorId],
          totalPrice: state[vendorId].totalPrice + selectedDish.price,
          quantity: state[vendorId].quantity + 1,
          dishes: dishes
        }
      }
    case DECREMENT_ITEM:
      vendorId = action.payload.vendor.id
      console.log(action.payload.cartItemId)
      selectedDish = state[vendorId].dishes.find((dish) => dish.cartItemId === action.payload.cartItemId)
      dishes = state[vendorId].dishes.map(dish => {
        if (dish.cartItemId === action.payload.cartItemId) {
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
          totalPrice: state[vendorId].totalPrice - selectedDish.price,
          quantity: state[vendorId].quantity - 1,
          dishes: dishes
        }
      }
    default:
      return state
  }
}