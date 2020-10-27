import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import {
  Collapse,
  TableRow,
  TableCell,
  IconButton,
  Tooltip
} from '@material-ui/core'
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  ThumbUp,
  Delete
} from '@material-ui/icons'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const clickableStyle = {
    cursor: 'pointer',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none'
  }

  const showRemovalButton = { display: user.username === blog.user.username ? '' : 'none' }

  const toggleVisibility = () => {
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
    <>
      <TableRow className="blogVisibleDiv">
        <TableCell>
          <span onClick={() => history.push(`/blogs/${blog.id}`)} style={clickableStyle}>
            {blog.title} {blog.author}
          </span>
        </TableCell>
        <TableCell>
          <IconButton size="small" onClick={toggleVisibility} className="blogToggleButton">
            {visible ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={visible} className="togglableInfoDiv" timeout="auto" unmountOnExit>
            <div style={{ padding: "20px" }}>
              <div>
                {blog.url}
              </div>
              <div>
                likes {' '} {likes} {' '}
                <Tooltip title="Like" enterDelay={400} placement="right">
                  <IconButton onClick={addLike} size="small" className="likeButton">
                    <ThumbUp color="primary" />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                {blog.user.name}
              </div>
              <Tooltip title="Delete blog" enterDelay={400} placement="bottom-start">
                <IconButton color="secondary" size="small" onClick={remove} style={showRemovalButton}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
