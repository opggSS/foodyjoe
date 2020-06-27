import React from 'react'
import { Link } from 'react-router-dom'
export default function SignHome() {
  return (
    <div>
      <Link to="signup">
        <div>
          Sign Up
      </div>
      </Link>
      <Link to='signin'>
        <div >
          Sign In
      </div>
      </Link>

    </div>
  )
}
