import React, { useState } from 'react'
import { createComment } from '../reducers/commentReducer'
import { useDispatch } from 'react-redux'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const addComment = async (event) => {
    event.preventDefault()
    const commentObject = {
      content, blog: blog.id
    }
    const newComment = await dispatch(createComment(commentObject))
    
    if (newComment) {
      setContent('')
    }
  }
  return (
    <form onSubmit={addComment}>
      <input
        id='title'
        type='text'
        onChange={(event) => setContent(event.target.value)}
      />
      <button type="submit">
        add comment
      </button>
    </form>
  )
}

export default CommentForm