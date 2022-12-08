import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getVerificationCode } from '../api/UserService'

export const VerificationCode = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const { state } = useLocation()

  const submitHandler = () => {
    setIsLoading(true)
    let emailAddress = state.email ? state.email : email
    console.log(emailAddress)
    getVerificationCode(emailAddress)
      .then((res) => {
        setIsLoading(false)
        if (res.status === 201) {
          console.log('success')
        }
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Container component="main" maxWidth="sm">
        {isLoading && (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}>
            <CircularProgress color="inherit" />{' '}
          </Backdrop>
        )}
        <Typography component="h1" variant="h5">
          Verify your account
        </Typography>

        <Typography>
          Before you sign in we would like for you to verify you are human.
          Click the get verification code below to recieve an email with a code.
        </Typography>
        

        {!state.email && <TextField
          margin="normal"
          variant="standard"
          required
          fullWidth
          id="verificationcode"
          label="Verification Code"
          // {...register('firstName')}
          autoFocus
          // onChange={(e) => setFirstName(e.target.value)}
        />}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={submitHandler}
          // disabled={canRegister()}
        >
          Get Verification Code
        </Button>
      </Container>
    </>
  )
}
