import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/loggedUserReducer'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  const user = useSelector(state => state.loggedUser)
  const dispatch = useDispatch()
  const padding = {
    padding: 5
  }

  const handleLogout = (event) => {
    event.preventDefault()

    if (window.confirm('Are you sure you want to logout?')) {
      window.localStorage.removeItem('loggedBloglistUser')
      dispatch(setUser(null))
    }
  }

  return (
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/users">users</Link>
      <span style={padding}>
        {user.name} logged in
      </span>
      <button onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default NavigationBar