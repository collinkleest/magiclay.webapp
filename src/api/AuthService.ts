import { isLocalEnv, sleep } from '../utils'
import { LoginDto } from '../dto'

const API_ENDPOINT = 'http://localhost:3000'

export async function login(userData: LoginDto): Promise<Response> {
  if (isLocalEnv()) {
    await sleep(2000)
  }
  return await fetch(`${API_ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
}
