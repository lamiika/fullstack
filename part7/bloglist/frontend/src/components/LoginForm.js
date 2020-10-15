import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loggedUserReducer'
import { showNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await dispatch(login({ username, password }))
    if (user) {
      const message = `welcome ${user.name}`
      dispatch(showNotification(message, 'green', 2))
    } else {
      const message = 'wrong username or password'
      dispatch(showNotification(message, 'red', 2))
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          data-cy="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          data-cy="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" data-cy="loginSubmit">
        login
      </button>
    </form>
  )
}

export default LoginForm