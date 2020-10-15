import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './blogReducer'
import userReducer from './userReducer'
import loggedUserReducer from './loggedUserReducer'
import notificationReducer from './notificationReducer'
import commentReducer from './commentReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  loggedUser: loggedUserReducer,
  notification: notificationReducer,
  comments: commentReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store