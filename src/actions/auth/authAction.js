import { SIGN_IN_FAIL, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, CREATE_USER_SUCCESS } from '../types'
import { isFunction } from 'lodash';

// export const signIn = (payload) => {
//   return (dispatch, getState, { getFirestore, getFirebase }) => {
//     const firebase = getFirebase()
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptchaContainer', {
//       'size': 'invisible',
//       'callback': function (response) {
//         console.log('allow sign in with phone')
//       }
//     });

//     const appVerifier = window.recaptchaVerifier;
//     firebase.auth().signInWithPhoneNumber(payload.phone, appVerifier)
//       .then(confirmationResult => {
//         window.confirmationResult = confirmationResult;
//         const verificationCode = window.prompt('Please enter the verification ' +
//           'code that was sent to your mobile device.')
//           console.log(verificationCode)
//         if (verificationCode) {
//           confirmationResult.confirm(verificationCode).then((result => {
//             const user = result.user;
//             console.log(user)
//             const firestore = getFirestore()
//             firestore.collection('users').add({
//               phone: user.phoneNumber
//             })
//             dispatch({ type: SIGN_IN_SUCCESS, payload: user })
           
//           }))
//             .catch(function (error) {
//               dispatch({ type: SIGN_IN_FAIL, payload: error })
//             });
//         }
//       })
//   }
// }


export const signIn = (params) => async (dispatch, getState, {getFirestore, getFirebase}) => {
    const firebase = await getFirebase()    
    
    // set up recaptchaVerifier if there is not one already
    if(!window.recaptchaVerifier) {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': function(response) {}
          });
    }
    
    // send a verification code to user's phone
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(params.phone, appVerifier).then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        const verificationCode = window.prompt('Please enter your verification code: ')
        confirmationResult.confirm(verificationCode).then( async res => {
            // Create a user for this login if the user is not exist
            const firestore = await getFirestore() // This function is asynchronous...
            const {uid, phoneNumber} = res.user
            
            const user = await firestore.collection('users').doc(uid).get()
            if(!user.exists) {
                firestore.collection('users').doc(uid).set({
                    username: uid,
                    phone: phoneNumber
                }).then(res => {
                    console.log('res', res)
                }).catch(err => {
                    console.log('error: ', err)
                })
            }
            dispatch({
                type: SIGN_IN_SUCCESS, 
                payload: res.user
            })
        }).catch(err => {
            console.log(err)
            dispatch({ type: SIGN_IN_FAIL, payload: err })
        })
        // window.confirmationResult = confirmationResult;
      }).catch(function (error) {
        // Error; SMS not sent
        // ...
        dispatch({ type: SIGN_IN_FAIL, payload: error })
      });
    
   
}

export const signOut = () => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase()
    firebase.auth().signOut().then(() => {
      dispatch({ type: SIGN_OUT_SUCCESS })
    })
  }
}
