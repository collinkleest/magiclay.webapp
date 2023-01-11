import { Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getGroups } from '../api/GroupService'
import { CreateGroup } from '../components/CreateGroup'
import { Group } from '../components/Group'
import { JoinGroup } from '../components/JoinGroup'
import { IGroup } from '../dto'
import { useAuthContext } from '../providers/AuthContext'

export const Home = (): JSX.Element => {
  const authContext = useAuthContext()
  const [groups, setGroups] = useState(Array())

  useEffect(() => {
    if (authContext.authState.groups && authContext.authState.token) {
      getGroups(authContext.authState.token, authContext.authState.groups).then(
        async (res) => {
          const resGroups = await res.json()
          setGroups(resGroups)
        }
      )
    }
  }, [])

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">Welcome to MagicLay!</Typography>
      <CreateGroup />
      <JoinGroup />
      <Typography variant="h6">Your Betting Groups:</Typography>
      {groups.map((g) => {
        return <Group name={g.name} />
      })}
    </Container>
  )
}
