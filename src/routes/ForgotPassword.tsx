import { Button, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../constants'

export const ForgotPassword = (): JSX.Element => {
  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h3"> Forgot your password? </Typography>
      
      <TextField
        margin="normal"
        variant="standard"
        required
        fullWidth
        id="email"
        label="Email Address"
        // {...register('firstName')}
        autoFocus
        // onChange={(e) => setFirstName(e.target.value)}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        // onClick={handleSubmit(registerHandler)}
        // disabled={canRegister()}
        >
        Submit
      </Button>
      <Link to={Route.LOGIN}>Back to Login</Link>
    </Container>
  )
}
