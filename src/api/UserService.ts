import { isLocalEnv, sleep } from '../utils'
import { IUserDetails, IUserDto } from '../dto'
import { LOCAL_API_ENDPOINT, LOCAL_SLEEP_TIME } from '../constants'

export async function registerUser(userData: IUserDto): Promise<Response> {
  if (isLocalEnv()) {
    await sleep(LOCAL_SLEEP_TIME)
  }
  return await fetch(`${LOCAL_API_ENDPOINT}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
}

export async function getUserDetails(token: string): Promise<Response> {
  return await fetch(`${LOCAL_API_ENDPOINT}/user/details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}
