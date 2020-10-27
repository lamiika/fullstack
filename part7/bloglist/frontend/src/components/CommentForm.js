import React, { useState } from 'react'
import { createComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import {
  TextField,
  Button
} from '@material-ui/core'

const CommentForm = ({ blog, setBlog }) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const addComment = async (event) => {
    event.preventDefault()
    const commentObject = {
      content, blog: blog.id
    }
    const updatedBlog = await dispatch(createComment(commentObject))

    if (updatedBlog) {
      setBlog(updatedBlog)
      setContent('')
    }
  }
  return (
    <form onSubmit={addComment}>
      <TextField label="write a comment"
        variant="outlined"
        id='title'
        type='text'
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        add comment
      </Button>
    </form>
  )
}

export default CommentForm