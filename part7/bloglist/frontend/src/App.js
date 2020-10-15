import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import BlogView from './components/BlogView'
import UserList from './components/UserList'
import User from './components/User'
import LoginForm from './components/LoginForm'
import NavigationBar from './components/NavigationBar'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loggedUserReducer'
import { Switch, Route } from 'react-router-dom'

const App = () => {
  const loggedUser = useSelector(state => state.loggedUser)
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
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      {loggedUser === null ?
        <div>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm />
        </div> :
        <div>
          <NavigationBar />
          <h2>blog app</h2>
          <Notification />
          <Switch>
            <Route path="/blogs/:id">
              <BlogView />
            </Route>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/">
              <Togglable buttonLabel='create new'>
                <h2>create new</h2>
                <BlogForm />
              </Togglable>
              <BlogList />
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App