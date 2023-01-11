import { LOCAL_API_ENDPOINT, LOCAL_SLEEP_TIME } from '../constants'
import { isLocalEnv, sleep } from '../utils'

export async function getVerificationCode(email: string): Promise<Response> {
  if (isLocalEnv()) {
    await sleep(LOCAL_SLEEP_TIME)
  }
  return await fetch(`${LOCAL_API_ENDPOINT}/verification/generate-code`, {
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
    await sleep(LOCAL_SLEEP_TIME)
  }
  return await fetch(`${LOCAL_API_ENDPOINT}/verification/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, code: code })
  })
}
