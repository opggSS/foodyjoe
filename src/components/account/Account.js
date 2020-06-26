import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { signIn,signOut } from '../../actions/auth/authAction'

const Account = ({ orders, firebase, signIn,signOut, auth, authError }) => {
  const [phone, setPhone] = useState('')
  return (
    !auth.apiKey ? (
      <div className="orders">
        <div className="title">Order History</div>
        <div>
          phone:
        <input type="text" onChange={e => setPhone(e.target.value)} />
        </div>
        <div id='recaptchaContainer'></div>
        <button onClick={() => signIn({ phone: phone })}>sign in</button>
        {authError && <div>{authError}</div>}
      </div>
    ) :
    <div>
      <div>{auth.phoneNumber}</div>  
      <div onClick={signOut}>Sign Out</div>
    </div>
  )

}

const mapStateToProps = (state, ownProps) => {
  let orders = null
  if (state.firestore.ordered.orders) {
    orders = state.firestore.ordered.orders
  }
  return {
    orders: orders,
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

export default compose(
  connect(mapStateToProps, { signIn,signOut }),
  firestoreConnect(() => ['orders'])
)(Account)


