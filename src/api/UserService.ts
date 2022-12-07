import { isLocalEnv, sleep } from '../utils'
import { UserDto } from '../dto'

const API_ENDPOINT = 'http://localhost:3000'

export async function registerUser(userData: UserDto): Promise<Response> {
  if (isLocalEnv()) {
    await sleep(2000)
  }
  return await fetch(`${API_ENDPOINT}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
}
