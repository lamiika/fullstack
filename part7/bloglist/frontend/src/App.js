import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
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
    dispatch(initializeBlogs())
  }, [dispatch])

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
          <Togglable buttonLabel='create new blog'>
            <h2>create new</h2>
            <BlogForm />
          </Togglable>
          <BlogList
            user={user}
          />
        </div>
      }
    </div>
  )
}

export default App