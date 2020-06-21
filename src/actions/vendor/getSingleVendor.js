import {GET_SINGLE_VENDOR} from '../types'

//pass vendor Id to payload
export const getSingleVendor = (payload) =>{
  return (dispatch ,getState , {getFirebase, getFirestore}) =>{
    const firestore = getFirestore()
    firestore.collection('')
    dispatch({
      type:GET_SINGLE_VENDOR,
      payload: payload
    })
  }
}