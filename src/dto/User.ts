export interface IUserDto {
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
}

export interface IUserDetails extends Response {
  userId: string
  firstName: string
  lastName: string
  userName: string
  email: string
  groups: string[]
  createdTimestamp: number
  lastLoginTimestamp: number
}