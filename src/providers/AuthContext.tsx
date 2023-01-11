import { createContext, useContext, useState } from "react";
import { getUserDetails, ILoginResponse, refresh as callRefresh } from "../api";
import { IUserDetails } from "../dto";

export interface IAuthState {
  _id: string
  token: string
  userName: string
  email: string
  firstName: string
  lastName: string
  groups: string[]
  createdTimestamp: number
  lastLoginTimestamp: number
}

export interface IAuthContext {
  authState: IAuthState
  authLoading: boolean
  login: (authState: IAuthState) => void
  refresh: () => void
  logout: () => void
}

export interface AuthContextProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthContext = createContext<IAuthContext>(
  undefined as unknown as IAuthContext
);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [authLoading, setAuthLoading] = useState(true)
  const [authState, setAuthState] = useState({
    _id: '',
    token: '',
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    groups: Array(),
    createdTimestamp: 0,
    lastLoginTimestamp: 0
  })
  
  const login = (authState: IAuthState) => {
    setAuthState(authState)
  }

  const refresh = async ()  => {
    setAuthLoading(true)
    try {
      const refreshRes = await callRefresh()
      const refreshPayload = await refreshRes.json();
      if (refreshPayload && refreshPayload.token) {
        const userDetailsRes = await getUserDetails(refreshPayload.token);
        const userDetails: IUserDetails = await userDetailsRes.json()
        setAuthState({
          _id: userDetails.userId,
          userName: userDetails.userName,
          email: userDetails.email,
          token: refreshPayload.token,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          groups: userDetails.groups,
          lastLoginTimestamp: userDetails.lastLoginTimestamp,
          createdTimestamp: userDetails.createdTimestamp
        })
        setAuthLoading(false)
      }
    } catch (error) {
      console.log(`Authentication error`)
      setAuthLoading(false)
    }
  }

  const logout = () => {
    setAuthState({
        _id: '',
        token: '',
        userName: '',
        email: '',
        firstName: '',
        lastName: '',
        groups: Array(),
        createdTimestamp: 0,
        lastLoginTimestamp: 0
      }
    )
  }

  return (
    <AuthContext.Provider value={{authState, authLoading, login, refresh, logout} as IAuthContext}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}