import { isLocalEnv, sleep } from '../utils'
import { LoginDto } from '../dto'
import { LOCAL_API_ENDPOINT, LOCAL_SLEEP_TIME } from '../constants'

export interface ILoginResponse {
  token: string
}

export async function login(userData: LoginDto): Promise<Response> {
  if (isLocalEnv()) {
    await sleep(LOCAL_SLEEP_TIME)
  }
  return await fetch(`${LOCAL_API_ENDPOINT}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
}

export async function refresh(): Promise<Response> {
  return await fetch(`${LOCAL_API_ENDPOINT}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  })
}
