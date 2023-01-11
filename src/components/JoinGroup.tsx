import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'

export const JoinGroup = (): JSX.Element => {
  return (
    <Grid
      container
      spacing={2}
      display="flex"
      justifyContent="center"
      alignItems="center">
      <Grid item xs={10}>
        <TextField margin="normal" fullWidth id="password" label="Group Name" />
      </Grid>
      <Grid item xs={2} alignContent="center">
        <Button fullWidth size="large" variant="contained">
          Join
        </Button>
      </Grid>
    </Grid>
  )
}
