import React from 'react'
import CommentForm from './CommentForm'

const CommentSection = ({ blog, setBlog }) => {
  return (
    <div>
      <h3>comments</h3>
      <CommentForm blog={blog} setBlog={setBlog} />
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>
            {comment.content}
          </li>
        )}
      </ul>
    </div>
  )
}

export default CommentSection