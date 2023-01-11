import { LOCAL_API_ENDPOINT } from "../constants";


export async function getGroups(authToken: string, groupIds: string[]): Promise<Response> {
  const groupIdsStr = groupIds.join(',')
  return await fetch(`${LOCAL_API_ENDPOINT}/group?groups=${groupIdsStr}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  })
}

export async function createGroup(authToken: string, groupName: string): Promise<Response> {
  return await fetch(`${LOCAL_API_ENDPOINT}/group`, {
    method: 'POST',
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      name: groupName
    })
  })
}