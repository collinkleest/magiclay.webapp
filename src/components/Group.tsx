import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography
} from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'

interface GroupProps {
  name: string
}

export const Group = (props: GroupProps): JSX.Element => {
  return (
    <Button fullWidth variant="contained" endIcon={<ArrowForwardIos />}>
      {props.name}
    </Button>
  )
}
