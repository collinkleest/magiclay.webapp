import { Backdrop, CircularProgress } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { Route } from '../constants'
import { useAuthContext } from '../providers/AuthContext'

export const PrivateRoute = ({ children }: any) => {
  const auth = useAuthContext()

  if (!auth.authState.token || auth.authLoading) {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={auth.authLoading}>
        <CircularProgress color="inherit" />{' '}
      </Backdrop>
    )
  }

  return auth.authState.token ? children : <Navigate to={Route.LOGIN} />
}
