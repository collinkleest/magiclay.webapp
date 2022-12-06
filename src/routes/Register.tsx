import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
  Alert
} from '@mui/material'

export const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')

  const handleSubmit = async () => {
    setIsLoading(true)

    if (confirmPassword === password) {
      registerUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
        .then((response) => {
          setIsLoading(false)
          if (response.status == 201) {
            console.log('success')
          } else {
            response.json().then(
              (res) => {
                setPopupMessage(res.message.join(', '))
                setShowPopup(true)
              }
            )

          }
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err)
        })
    } else {
      setIsLoading(false)
      setPopupMessage('Passwords do not match!')
      setShowPopup(true)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      {isLoading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
          {popupMessage}
        </Alert>
      </Snackbar>

      <Typography component="h1" variant="h5">
        Sign Up with MagicLay
      </Typography>

      <TextField
        margin="normal"
        required
        fullWidth
        id="firstname"
        label="First Name"
        name="firstname"
        autoFocus
        onChange={(e) => setFirstName(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="lastname"
        label="Last Name"
        name="lastname"
        autoFocus
        onChange={(e) => setLastName(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        autoFocus
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="confirmpassword"
        label="Confirm Password"
        name="confirmpassword"
        autoFocus
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}>
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
