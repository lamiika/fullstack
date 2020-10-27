import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import {
  Button,
  TextField
} from '@material-ui/core'

const BlogForm = ({ toggleVisibility }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const dispatch = useDispatch()

  const handleChange = (event, key) => {
    setNewBlog({ ...newBlog, [key]: event.target.value })
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const success = await dispatch(createBlog(newBlog))
    if (success) {
      setNewBlog({ title: '', author: '', url: '' })
      const message = `A new blog added! ${newBlog.title} by ${newBlog.author}`
      dispatch(showNotification(message, 'green', 3))
      toggleVisibility()
    } else {
      const message = 'Creating a blog failed, title and url are required.'
      dispatch(showNotification(message, 'red', 5))
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <TextField label="title"
          id="title"
          type="text"
          value={newBlog.title}
          data-cy="title"
          onChange={event => handleChange(event, 'title')}
        />
      </div>
      <div>
        <TextField label="author"
          id="author"
          type="text"
          value={newBlog.author}
          data-cy="author"
          onChange={event => handleChange(event, 'author')}
        />
      </div>
      <div>
        <TextField label="url"
          id="url"
          type="text"
          value={newBlog.url}
          data-cy="url"
          onChange={event => handleChange(event, 'url')}
        />
      </div>
      <Button variant="contained" color="primary" type="submit" data-cy="blogSubmit">
        create
      </Button>
    </form>
  )
}

export default BlogForm