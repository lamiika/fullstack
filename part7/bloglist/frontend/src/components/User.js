import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core'
import { ImportContacts } from '@material-ui/icons'

const User = () => {
  const history = useHistory()
  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant="h6" style={{ marginBottom: '20px' }}>{user.name}</Typography>
      <Typography variant="subtitle1">Added blogs:</Typography>
      <List>
        {user.blogs.map(blog =>
          <ListItem key={blog.id}>
            <ListItemIcon>
              <Tooltip title="Open blog" enterDelay={600}>
                <IconButton onClick={() => history.push(`/blogs/${blog.id}`)}>
                  <ImportContacts />
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText>
              {blog.title}
            </ListItemText>
          </ListItem>
        )}
      </List>
    </div>
  )
}

export default User