import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../constants'

export const Root = () => {
  return (
    <div className="App">
      <h1> Welcome to MagicLay </h1>
      <h3>Where Group Parlays Happen</h3>
      <button>
        {' '}
        <Link to={Route.LOGIN}> Login </Link>
      </button>
      <button>
        {' '}
        <Link to={Route.REGISTER}> Register </Link>
      </button>
    </div>
  )
}
