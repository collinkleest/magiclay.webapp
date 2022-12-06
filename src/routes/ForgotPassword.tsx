import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../constants'

export const ForgotPassword = () => {
  return (
    <div className="App">
      <h1> Forgot your password? </h1>
      <label>Email Address</label>
      <input placeholder="email address"></input>
      <button>Submit</button>
      <button>
        <Link to={Route.FORGOT_PASSWORD}>Back to Login</Link>
      </button>
    </div>
  )
}
