import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const history = useHistory()
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
  const margin = {
    marginLeft: 10
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showRemovalButton = { display: user.username === blog.user.username ? '' : 'none' }

  const toggleVisibility = () => {
    visible ? setToggleButtonText('view') : setToggleButtonText('hide')
    setVisible(!visible)
  }

  const addLike = async (event) => {
    event.preventDefault()
    const newBlog = { ...blog, likes: likes + 1 }
    const updatedBlog = await dispatch(likeBlog(newBlog))
    if (updatedBlog) {
      setLikes(updatedBlog.likes)
      const message = `You liked ${blog.title} by ${blog.author}`
      dispatch(showNotification(message, 'green', 1))
    } else {
      console.log('fail')
    }
  }

  const remove = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      const success = await dispatch(removeBlog(blog))
      if (success) {
        const message = `Blog ${blog.title} by ${blog.author} successfully removed`
        dispatch(showNotification(message, 'green', 3))
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div className="blogVisibleDiv">
        <span onClick={() => history.push(`/blogs/${blog.id}`)} style={clickableStyle}>
          {blog.title} {blog.author}
        </span>
        <button onClick={toggleVisibility} style={margin} className="blogToggleButton">
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
        <button onClick={remove} style={showRemovalButton}>
          remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
