import React, { FC, useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Route as RouteConstants } from '../constants'
import { useAuthContext } from "../providers/AuthContext"
import { ForgotPassword, Login, Register, Root } from "../routes"
import { Home } from "../routes/Home"
import { PrivateRoute } from "../routes/PrivateRoute"
import { VerificationCode } from "../routes/VerificationCode"

const router = createBrowserRouter([
  {
    path: RouteConstants.ROOT,
    element: <Root />
  },
  {
    path: RouteConstants.LOGIN,
    element: <Login />
  },
  {
    path: RouteConstants.FORGOT_PASSWORD,
    element: <ForgotPassword />
  },
  {
    path: RouteConstants.REGISTER,
    element: <Register />
  },
  {
    path: RouteConstants.VERIFICATION_CODE,
    element: <VerificationCode />
  },
  {
    path: RouteConstants.HOME,
    element: 
      <PrivateRoute>
        <Home />
      </PrivateRoute>
  } 
])

export const App = (): JSX.Element => {
  const auth = useAuthContext()

  useEffect( () => {
    if (!auth.authState || !auth.authState.token) {
      auth.refresh()
    }
  }, [])

  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}