import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/UserService'
import { Route } from '../constants'
import { Container } from '@mui/system'
import {
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Backdrop,
  Snackbar,
  Alert,
  Dialog
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegistrationFormData, RegistrationSchema } from '../schemas'
import './styles.css'

export const Register = (): JSX.Element => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(RegistrationSchema),
    mode: 'onTouched'
  })

  const canRegister = (): boolean => {
    return (
      !!errors.firstName ||
      firstName === '' ||
      !!errors.lastName ||
      lastName === '' ||
      !!errors.email ||
      email === '' ||
      !!errors.password ||
      password === '' ||
      !!errors.confirmPassword ||
      confirmPassword === ''
    )
  }

  const registerHandler = async () => {
    setIsLoading(true)
    registerUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })
      .then((response) => {
        setIsLoading(false)
        reset({})
        if (response.status == 201) {
          navigate(Route.VERIFICATION_CODE, {
            state: { email: email }
          })
        } else {
          setShowPopup(true)
          response.json().then((res) => {
            if (Array.isArray(res.message)) {
              setPopupMessage(res.message.join(', '))
            } else {
              setPopupMessage(res.message)
            }
          })
        }
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
      })
  }

  return (
    <Container component="main" maxWidth="sm">
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

      <Snackbar
        open={showPopup}
        autoHideDuration={6000}
        onClose={() => setShowPopup(false)}
        message="Note archived">
        <Alert
          onClose={() => setShowPopup(false)}
          severity="error"
          sx={{ width: '100%' }}>
          {popupMessage !== ''
            ? popupMessage
            : 'There is was an error please try again later'}
        </Alert>
      </Snackbar>

      <Typography component="h1" variant="h5">
        Sign Up with MagicLay
      </Typography>

      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        id="firstname"
        label="First Name"
        {...register('firstName')}
        autoFocus
        onChange={(e) => setFirstName(e.target.value)}
      />

      <p className="form-error-message">{errors.firstName?.message}</p>

      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        id="lastname"
        label="Last Name"
        {...register('lastName')}
        onChange={(e) => setLastName(e.target.value)}
      />

      <p className="form-error-message">{errors.lastName?.message}</p>

      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        id="email"
        label="Email Address"
        {...register('email')}
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

      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        id="confirmpassword"
        label="Confirm Password"
        type="password"
        {...register('confirmPassword')}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <p className="form-error-message">{errors.confirmPassword?.message}</p>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit(registerHandler)}
        disabled={canRegister()}>
        Register
      </Button>

      <Grid container>
        <Grid item xs>
          <Link to={Route.FORGOT_PASSWORD}>Forgot password?</Link>
        </Grid>
        <Grid item>
          <Link to={Route.LOGIN}>{'Have an account? Sign In'}</Link>
        </Grid>
      </Grid>
    </Container>
  )
}
