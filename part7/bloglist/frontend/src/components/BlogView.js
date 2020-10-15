import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useRouteMatch, useHistory } from 'react-router-dom'
import CommentSection from './CommentSection'
import blogService from '../services/blogs'

const BlogView = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [likes, setLikes] = useState(0)
  const user = useSelector(state => state.loggedUser)
  const match = useRouteMatch('/blogs/:id')
  const [blog, setBlog] = useState(null)
  
  useEffect(() => {
    const getBlog = async () => {
      const response = await blogService.getComments(match.params.id)
      setBlog(response)
    }
    getBlog()
  }, [match.params.id])

  if (!blog || !user) {
    return null
  }

  const showRemovalButton = { display: user.username === blog.user.username ? '' : 'none' }

  const addLike = async (event) => {
    event.preventDefault()
    const newBlog = { ...blog, likes: blog.likes + 1 }
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
        history.push('/')
      }
    }
  }

  return (
    <div>
      <div>
        <h2>{blog.title} {blog.author}</h2>
      </div>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {' '} {likes ? likes : blog.likes} {' '}
          <button onClick={addLike} className="likeButton">like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <button onClick={remove} style={showRemovalButton}>
          remove
        </button>
        <CommentSection blog={blog} />
      </div>
    </div>
  )
}

export default BlogView