import { Button, Container, TextField, Typography } from '@mui/material'

export const VerificationCode = (): JSX.Element => {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Enter your verificaiton code
        </Typography>

        <Typography component="p" variant="subtitle2">
          We've sent a verification code to the email:
        </Typography>

        <TextField
          margin="normal"
          variant="standard"
          required
          fullWidth
          id="verificationcode"
          label="Verification Code"
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
      </Container>
    </>
  )
}
