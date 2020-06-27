import React, { useState } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { signIn, signOut } from '../../actions/auth/authAction'

const SignUp = ({auth}) => {
  const [signUpValues, setSignUpValues] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  if (auth.apiKey) {
    return <Redirect to='/account'> </Redirect>
  }

  return (
    <div>
      <ul>
        <li>
          <input type="text" placeholder="Email..." onChange={(e) => setSignUpValues({
            ...signUpValues,
            email: e.target.value
          })} />
        </li>
        <li>
          <input type="text" placeholder="Username..." onChange={(e) => setSignUpValues({
            ...signUpValues,
            username: e.target.value
          })} />
        </li>
        <li>
          <input type="password" placeholder="Password..." onChange={(e) => setSignUpValues({
            ...signUpValues,
            password: e.target.value
          })} />
        </li>
        <li>
          <input type="password" placeholder="Conform Password..." onChange={(e) => setSignUpValues({
            ...signUpValues,
            confirmPassword: e.target.value
          })} />
        </li>
      </ul>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}


export default 
  connect(mapStateToProps, { signIn, signOut })(SignUp)

