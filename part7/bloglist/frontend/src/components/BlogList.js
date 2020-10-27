import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import {
  TableContainer,
  Table,
  TableBody,
  Paper
} from '@material-ui/core'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.loggedUser)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog => (
              <Blog key={blog.id}
                blog={blog}
                user={user}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList