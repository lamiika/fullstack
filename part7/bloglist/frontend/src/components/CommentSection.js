import React from 'react'

const CommentSection = ({ blog }) => {
  return (
    <div>
      <h3>comments</h3>
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