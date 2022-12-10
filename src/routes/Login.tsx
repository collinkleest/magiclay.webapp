import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Container, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { login } from '../api'
import HttpStatusCode from '../common/HttpStatusCode'
import { Route } from '../constants'
import { LoginFormData, LoginSchema } from '../schemas'

export const Login = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = () => {
    login({ email: email, password: password })
      .then((res) => {
        if (res.status === HttpStatusCode.FORBIDDEN) {
          // do stuff
        } else if (res.status === HttpStatusCode.UNAUTHORIZED) {
          // do unauthorized stuff
        } else if (res.status === HttpStatusCode.CREATED) {
          // success!
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
    mode: 'onTouched'
  })

  return (
    <Container maxWidth="sm">
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
        onClick={handleSubmit(loginHandler)}
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
