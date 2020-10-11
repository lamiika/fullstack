import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store