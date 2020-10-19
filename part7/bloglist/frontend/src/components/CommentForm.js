import React, { useState } from 'react'
import { createComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

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
      <input
        id='title'
        type='text'
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <button type="submit">
        add comment
      </button>
    </form>
  )
}

export default CommentForm