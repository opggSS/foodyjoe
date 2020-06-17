import {combineReducers} from 'redux'
import cartReducer from './cart'
import lastVisitedVendorIdReducer from './lastVisitedVendorId'
export default combineReducers({
  cartState: cartReducer,
  lastVisitedVendorIdState: lastVisitedVendorIdReducer
})