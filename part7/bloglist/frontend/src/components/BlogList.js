import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blog)

  return (
    <div>
      {blogs.map(blog => {
        <Blog
          blog={blog}
          updateBlog={null}
          removeBlog={null}
          user={null}
        />
      })}
    </div>
  )
}

export default BlogList