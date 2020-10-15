import React from 'react'
import CommentForm from './CommentForm'

const CommentSection = ({ blog }) => {
  return (
    <div>
      <h3>comments</h3>
      <CommentForm blog={blog} />
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