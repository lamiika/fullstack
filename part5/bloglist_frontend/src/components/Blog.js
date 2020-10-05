import React, { useState } from 'react'
const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)
  const [toggleButtonText, setToggleButtonText] = useState('view')
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const clickableStyle = {
    cursor: 'pointer',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none'
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    visible ? setToggleButtonText('view') : setToggleButtonText('hide')
    setVisible(!visible)
  }

  const addLike = (event) => {
    event.preventDefault()
    const newBlog = { ...blog, likes: likes + 1 }
    setLikes(likes + 1)
    updateBlog(newBlog)
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility} style={clickableStyle}>
        {blog.title} {blog.author} {' '}
        <button onClick={toggleVisibility}>
          {toggleButtonText}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {' '} {likes} {' '}
          <button onClick={addLike}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </div>
    </div>
  )
}

export default Blog
