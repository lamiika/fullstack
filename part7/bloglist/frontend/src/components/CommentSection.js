import React from 'react'
import CommentForm from './CommentForm'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography
} from '@material-ui/core'
import { Person } from '@material-ui/icons'

const CommentSection = ({ blog, setBlog }) => {
  return (
    <div>
      <Typography>Comments</Typography>
      <CommentForm blog={blog} setBlog={setBlog} />
      <List>
        {blog.comments.map(comment =>
          <ListItem key={comment.id}>
            <ListItemIcon>
              <Person color="primary" />
            </ListItemIcon>
            <ListItemText primary={comment.content} />
          </ListItem>
        )}
      </List>
    </div>
  )
}

export default CommentSection