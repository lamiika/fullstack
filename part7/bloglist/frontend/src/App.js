import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs } from './reducers/blogReducer'
import { showNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      const message = `A new blog added! ${blog.title} by ${blog.author}`
      dispatch(showNotification(message, 'green', 3))
      return true
    } catch (exception) {
      console.log(exception)
      const message = 'Creating a blog failed, title and url are required.'
      dispatch(showNotification(message, 'red', 5))
      blogFormRef.current.toggleVisibility()
      return false
    }
  }

  const updateBlog = async (newBlog) => {
    const index = blogs.findIndex(blog => blog.id === newBlog.id)
    try {
      const updatedBlog = await blogService.update(newBlog)
      const newBlogs = [ ...blogs.slice(0, index), updatedBlog, ...blogs.slice(index + 1) ]
      setBlogs(newBlogs)
      return updatedBlog
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      try {
        await blogService.remove(blog)
        const newBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(newBlogs)
        const message = `Blog ${blog.title} by ${blog.author} successfully removed`
        dispatch(showNotification(message, 'green', 3))
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const message = 'wrong username or password'
      dispatch(showNotification(message, 'red', 2))
      console.log(exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    if (window.confirm('Are you sure you want to logout?')) {
      window.localStorage.removeItem('loggedBloglistUser')
      setUser(null)
    }
  }

  return (
    <div>
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            username={username} password={password}
            setUsername={setUsername} setPassword={setPassword}
          />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <h2>create new</h2>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => Number(b.likes) - Number(a.likes))
            .map(blog =>
              <Blog key={blog.id} blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                user={user} />
            )}
        </div>
      }
    </div>
  )
}

export default App