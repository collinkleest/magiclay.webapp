import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { getVerificationCode, submitVerificationCode } from '../api'
import { PopupProps } from '../common'
import { Route } from '../constants'
import { EmailFormData, EmailSchema } from '../schemas/verification'

export const VerificationCode = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [showPopup, setShowPopup] = useState({
    show: false,
    message: 'There was an error',
    severity: 'error'
  } as PopupProps)
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const { state } = useLocation()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    reset
  } = useForm<EmailFormData>({
    resolver: yupResolver(EmailSchema),
    mode: 'onTouched'
  })

  const submitCodeHandler = () => {
    setIsLoading(true)
    const emailAddress = state ? state.email : email
    submitVerificationCode(emailAddress, parseInt(code))
      .then((response) => {
        setIsLoading(false)
        if (response.status === 201) {
          setShowPopup({
            show: true,
            message: 'Verification successful',
            severity: 'success'
          })
          navigate(Route.LOGIN)
        } else {
          setShowPopup({
            show: true,
            message: 'Verification failed',
            severity: 'error'
          })
        }
      })
      .catch(() => {
        setIsLoading(false)
        setShowPopup({
          show: true,
          message: 'Verification failed',
          severity: 'error'
        })
      })
  }

  const emailSubmitHandler = () => {
    setIsLoading(true)
    let emailAddress = state ? state.email : email
    getVerificationCode(emailAddress)
      .then((res) => {
        setIsLoading(false)
        if (res.status === 201) {
          reset()
          setShowSubmit(true)
          setShowPopup({
            show: true,
            message: 'Verification code successfully sent',
            severity: 'success'
          })
        } else {
          setShowPopup({
            show: true,
            message: 'Verification code failed to send',
            severity: 'error'
          })
        }
      })
      .catch(() => {
        setIsLoading(false)
        setShowPopup({
          show: true,
          message: 'Verification code failed to send',
          severity: 'error'
        })
      })
  }

  return (
    <>
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
          open={showPopup.show}
          autoHideDuration={6000}
          onClose={() =>
            setShowPopup({
              show: false,
              message: 'There was an error',
              severity: 'error'
            })
          }
          message="Note archived">
          <Alert
            onClose={() =>
              setShowPopup({
                show: false,
                message: 'There was an error',
                severity: 'error'
              })
            }
            severity={showPopup.severity}
            sx={{ width: '100%' }}>
            {showPopup.message}
          </Alert>
        </Snackbar>

        <Typography component="h1" variant="h5">
          Verify your account
        </Typography>

        <Typography>
          Before you sign in we would like for you to verify you are human.
          Click the get verification code below to recieve an email with a code.
        </Typography>

        {!state && (
          <>
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
          </>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={emailSubmitHandler}>
          Get Verification Code
        </Button>

        {showSubmit && (
          <>
            <TextField
              margin="normal"
              variant="standard"
              required
              fullWidth
              id="verificationcode"
              label="Verification Code"
              autoFocus
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submitCodeHandler}
              disabled={code === ''}>
              Submit
            </Button>
          </>
        )}
      </Container>
    </>
  )
}
