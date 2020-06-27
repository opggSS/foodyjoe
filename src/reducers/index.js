import {combineReducers} from 'redux'
import cartReducer from './cartReducer'
import authReducer from './authReducer'
import vendorReducer from './vendorReducer'
import lastVisitedVendorIdReducer from './lastVisitedVendorId'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
import dishReducer from './dishReducer'
export default combineReducers({
  cartState: cartReducer,
  lastVisitedVendorIdState: lastVisitedVendorIdReducer,
  auth:authReducer,
  vendors: vendorReducer,
  firestore:firestoreReducer,
  firebase: firebaseReducer,
  dishes: dishReducer,
})