import React from 'react'
import ReactDOM from 'react-dom/client'
import { Root, Login, ForgotPassword, Register } from './routes'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Route as RouteConstants } from './constants'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

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
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
