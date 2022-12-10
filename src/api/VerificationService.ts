import { isLocalEnv, sleep } from '../utils'
import { UserDto } from '../dto'

const API_ENDPOINT = 'http://localhost:3000'

export async function getVerificationCode(email: string): Promise<Response> {
  if (isLocalEnv()) {
    await sleep(2000)
  }
  return await fetch(`${API_ENDPOINT}/verification/generate-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  })
}

export async function submitVerificationCode(
  email: string,
  code: number
): Promise<Response> {
  if (isLocalEnv()) {
    await sleep(2000)
  }
  return await fetch(`${API_ENDPOINT}/verification/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, code: code })
  })
}
