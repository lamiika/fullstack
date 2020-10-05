import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState({
    color: 'blue',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      const message = `A new blog added! ${blog.title} by ${blog.author}`
      showNotification(message, 'green', 3)
      return true
    } catch (exception) {
      console.log(exception)
      const message = 'Creating a blog failed, title and url are required.'
      showNotification(message, 'red', 5)
      blogFormRef.current.toggleVisibility()
      return false
    }
  }

  const updateBlog = async (newBlog) => {
    try {
      await blogService.update(newBlog)
    } catch (exception) {
      console.log(exception)
    }
  }

  const showNotification = (message, color, duration) => {
    setNotificationMessage(message)
    setMessageStyle({ ...messageStyle, color: color })
    setTimeout(() => {
      setNotificationMessage(null)
    }, duration * 1000);
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
      showNotification(message, 'red', 2)
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
          <Notification message={notificationMessage} style={messageStyle} />
          <LoginForm
            handleLogin={handleLogin}
            username={username} password={password}
            setUsername={setUsername} setPassword={setPassword}
          />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification message={notificationMessage} style={messageStyle} />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <h2>create new</h2>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App