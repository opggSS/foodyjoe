import { SIGN_IN_FAIL, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, CREATE_USER_SUCCESS } from '../types'

export const signIn = (payload) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase()
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptchaContainer', {
      'size': 'invisible',
      'callback': function (response) {
        console.log('allow sign in with phone')
      }
    });

    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(payload.phone, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        var verificationCode = window.prompt('Please enter the verification ' +
          'code that was sent to your mobile device.')
          console.log(verificationCode)
        if (verificationCode) {
          confirmationResult.confirm(verificationCode).then((result => {
            var user = result.user;
            console.log(user)
            const firestore = getFirestore()
            firestore.collection('users').add({
              phone: user.phoneNumber
            })
            dispatch({ type: SIGN_IN_SUCCESS, payload: user })
           
          }))
            .catch(function (error) {
              dispatch({ type: SIGN_IN_FAIL, payload: error })
            });
        }
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
