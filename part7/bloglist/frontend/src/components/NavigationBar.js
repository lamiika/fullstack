import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/loggedUserReducer'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Typography
} from '@material-ui/core'

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
    <AppBar position="static" style={{ marginBottom: '14px' }}>
      <Toolbar>
        <Typography variant="h6" style={padding}>
          Blog app
        </Typography>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Typography variant="caption" style={padding}>
          {user.name} logged in
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavigationBar