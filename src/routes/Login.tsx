import { yupResolver } from '@hookform/resolvers/yup'
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField
} from '@mui/material'
import React, { MouseEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { getUserDetails, ILoginResponse, login } from '../api'
import HttpStatusCode from '../common/HttpStatusCode'
import { Route } from '../constants'
import { IUserDetails } from '../dto'
import { useAuthContext } from '../providers/AuthContext'
import { LoginFormData, LoginSchema } from '../schemas'
import { sleep } from '../utils'

export const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuthContext()

  const loginHandler = (e: MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    login({ email: email, password: password })
      .then(async (res) => {
        if (res.status === HttpStatusCode.FORBIDDEN) {
          setIsLoading(false)
          // do stuff
        } else if (res.status === HttpStatusCode.UNAUTHORIZED) {
          setIsLoading(false)
          // do unauthorized stuff
        } else if (res.status === HttpStatusCode.OK) {
          const loginRes: ILoginResponse = await res.json()
          getUserDetails(loginRes.token)
            .then(async (details) => {
              setIsLoading(false)
              const userDetails: IUserDetails = await details.json()
              auth.login({
                _id: userDetails.userId,
                userName: userDetails.userName,
                email: userDetails.email,
                token: loginRes.token,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                groups: userDetails.groups,
                lastLoginTimestamp: userDetails.lastLoginTimestamp,
                createdTimestamp: userDetails.createdTimestamp
              })
              await sleep(100) // TODO: fix this and get to work without sleep
              navigate(Route.HOME)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
      })
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
    mode: 'onTouched'
  })

  return (
    <Container maxWidth="sm">
      {isLoading && (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}
          open={isLoading}>
          <CircularProgress color="inherit" />{' '}
        </Backdrop>
      )}
      <h1> Login to your Magic Lay Account </h1>

      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        id="email"
        label="Email Address"
        {...register('email')}
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />

      <p className="form-error-message">{errors.email?.message}</p>

      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        id="password"
        label="Password"
        type="password"
        {...register('password')}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="form-error-message">{errors.password?.message}</p>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={(e) => loginHandler(e)}
        disabled={
          !!errors.email || email === '' || !!errors.password || password === ''
        }>
        Login
      </Button>

      <Grid container>
        <Grid item xs>
          <Link to={Route.FORGOT_PASSWORD}>Forgot password?</Link>
        </Grid>
        <Grid item>
          <Link to={Route.REGISTER}> Dont have an account? Register</Link>
        </Grid>
      </Grid>
    </Container>
  )
}
