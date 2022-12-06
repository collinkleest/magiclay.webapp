import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../constants'

export const Login = () => {
  return (
    <div className="App">
      <h1> Login to your Magic Lay Account </h1>
      <label>Email</label>
      <input placeholder="email address"></input>

      <label>Password</label>
      <input placeholder="password"></input>

      <button>Log in</button>
      <button>
        <Link to={Route.FORGOT_PASSWORD}>Forgot Password</Link>
      </button>
      <button>
        <Link to={Route.REGISTER}>Register</Link>
      </button>
    </div>
  )
}
