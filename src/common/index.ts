import { AlertColor } from '@mui/material'

export interface PopupProps {
  show: boolean
  message: string
  severity: AlertColor
}

export * from './HttpStatusCode'
