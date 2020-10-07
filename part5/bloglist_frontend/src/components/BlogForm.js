import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleChange = (event, key) => {
    setNewBlog({ ...newBlog, [key]: event.target.value })
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const success = await createBlog(newBlog)
    if (success) {
      setNewBlog({ title: '', author: '', url: '' })
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
          onChange={event => handleChange(event, 'title')}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          value={newBlog.author}
          onChange={event => handleChange(event, 'author')}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          value={newBlog.url}
          onChange={event => handleChange(event, 'url')}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm