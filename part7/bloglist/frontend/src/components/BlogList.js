import React from 'react'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector(state => state.blog)

  return (
    <div>
      hey
    </div>
  )
}

export default BlogList