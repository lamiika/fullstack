import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './blogReducer'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store