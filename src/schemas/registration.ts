import * as yup from 'yup'

export const VerificationSchema = yup.object({
  code: yup.string().required('Code is required')
})

export type VerificationFormData = {
  code: string
}

export const RegistrationSchema = yup.object({
  firstName: yup
    .string()
    .min(2, 'First name must be longer than 2 characters')
    .max(35, 'First name cannot be longer than 35 characters')
    .required('First name is a required field'),
  lastName: yup
    .string()
    .min(2, 'Last name must be longer than 2 characters')
    .max(35, 'Last name cannot be longer than 35 characters')
    .required('First name is a required field'),
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('Email address is a required field'),
  password: yup
    .string()
    .required('Please enter a valid password')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      'Password requires 8-20 characters, one number, and one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password.')
})

export type RegistrationFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}
