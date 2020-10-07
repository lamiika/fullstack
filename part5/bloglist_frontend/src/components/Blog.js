import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
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
  const showLogoutButton = { display: user.username === blog.user.username ? '' : 'none' }

  const toggleVisibility = () => {
    visible ? setToggleButtonText('view') : setToggleButtonText('hide')
    setVisible(!visible)
  }

  const addLike = async (event) => {
    event.preventDefault()
    const newBlog = { ...blog, likes: likes + 1 }
    const updatedBlog = await updateBlog(newBlog)
    setLikes(updatedBlog.likes)
  }

  const remove = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility} style={clickableStyle} className="blogVisibleDiv">
        {blog.title} {blog.author} {' '}
        <button onClick={toggleVisibility} className="blogToggleButton">
          {toggleButtonText}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableInfoDiv">
        <div>
          {blog.url}
        </div>
        <div>
          likes {' '} {likes} {' '}
          <button onClick={addLike} className="likeButton">like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <button onClick={remove} style={showLogoutButton}>
          remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
