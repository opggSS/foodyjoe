import { SIGN_IN_FAIL, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, CREATE_USER_SUCCESS } from '../types'

export const signUp = (payload) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase()
    firebase.auth().signInWithEmailAndPassword(
      payload.email,
      payload.password
    ).then( ()=>{
      dispatch({type:SIGN_IN_SUCCESS})
    }).catch(err =>{
      dispatch({type:SIGN_IN_FAIL, payload:err})
    })
  }
}

export const signIn = (payload) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase()
    firebase.auth().signInWithEmailAndPassword(
      payload.email,
      payload.password
    ).then( ()=>{
      dispatch({type:SIGN_IN_SUCCESS})
    }).catch(err =>{
      dispatch({type:SIGN_IN_FAIL, payload:err})
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase()
    firebase.auth().signOut().then(() => {
      dispatch({ type: SIGN_OUT_SUCCESS })
    })
  }
}