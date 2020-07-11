import { SIGN_IN_FAIL, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SET_USER_INFO, CLEAR_USER_INFO } from '../types'
import { history } from '../../App';

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


export const signIn = (params) => async (dispatch, getState, { getFirestore, getFirebase }) => {
  const firebase = await getFirebase()

  // set up recaptchaVerifier if there is not one already
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function (response) { }
    });
  }

  // send a verification code to user's phone
  const appVerifier = window.recaptchaVerifier;
  firebase.auth().signInWithPhoneNumber(params.phone, appVerifier).then(function (confirmationResult) {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    const verificationCode = window.prompt('Please enter your verification code: ')
    confirmationResult.confirm(verificationCode).then(async res => {
      // Create a user for this login if the user is not exist
      const firestore = await getFirestore() // This function is asynchronous...
      const { uid, phoneNumber } = res.user

      const user = await firestore.collection('users').doc(uid).get()
      if (!user.exists) {
        firestore.collection('users').doc(uid).set({
          username: '',
          email: '',
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
      dispatch({ type: SIGN_IN_FAIL, payload: err })
    })
    // window.confirmationResult = confirmationResult;
  }).catch(function (error) {
    // Error; SMS not sent
    // ...
    dispatch({ type: SIGN_IN_FAIL, payload: error.message })
  });
}

export const signOut = () => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase()
    firebase.auth().signOut().then(() => {
      dispatch({ type: SIGN_OUT_SUCCESS })
      dispatch({ type: CLEAR_USER_INFO })
    })
  }
}

export const updateUserInfo = ({ user, isGoBack }) => (dispatch, getState, { getFirestore, getFirebase }) => {
  const uid = getState().firebase.auth.uid
  const firestore = getFirestore()
  firestore.collection('users').doc(uid).set(user).then(() => {
    if (isGoBack) {
      history.goBack()
    }
  }).catch(err => {
    alert('cannot update user')
  })
}



export const setUserInfo = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_USER_INFO,
      payload: payload
    })
  }
}

