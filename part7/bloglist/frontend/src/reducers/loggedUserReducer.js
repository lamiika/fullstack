import loginService from '../services/login'
import blogService from '../services/blogs'

const loggedUserReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    default:
      return state
  }
}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      dispatch({
        type: 'SET_USER',
        data: user
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      return user
    } catch (exception) {
      console.log(exception)
      return false
    }
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export default loggedUserReducer