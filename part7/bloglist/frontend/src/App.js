import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = (event) => {
    event.preventDefault()

    if (window.confirm('Are you sure you want to logout?')) {
      window.localStorage.removeItem('loggedBloglistUser')
      dispatch(setUser(null))
    }
  }

  return (
    <div>
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='create new blog'>
            <h2>create new</h2>
            <BlogForm />
          </Togglable>
          <BlogList />
        </div>
      }
    </div>
  )
}

export default App