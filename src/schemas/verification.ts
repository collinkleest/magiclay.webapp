import * as yup from 'yup'

export type EmailFormData = { email: string }
export type CodeFormData = { code: string }

export const CodeSchema = yup.object({
  code: yup.string().required('Code is required')
})

export const EmailSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('Email is required')
})
