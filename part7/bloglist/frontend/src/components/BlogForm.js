import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

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
        title:
        <input
          id="title"
          type="text"
          value={newBlog.title}
          data-cy="title"
          onChange={event => handleChange(event, 'title')}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          value={newBlog.author}
          data-cy="author"
          onChange={event => handleChange(event, 'author')}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          value={newBlog.url}
          data-cy="url"
          onChange={event => handleChange(event, 'url')}
        />
      </div>
      <button type="submit" data-cy="blogSubmit">
        create
      </button>
    </form>
  )
}

export default BlogForm