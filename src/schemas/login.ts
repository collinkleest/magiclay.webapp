import * as yup from 'yup'

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is a required field')
})

export type LoginFormData = {
  email: string
  password: string
}
