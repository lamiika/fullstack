import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COMMENTS':
      return action.data
    case 'ADD_COMMENT':
      return [...state, action.data]
    default:
      return state
  }
}

export const initializeComments = () => {
  return async dispatch => {
    try {
      const comments = await commentService.getAll()

      dispatch({
        type: 'INIT_COMMENT',
        data: comments
      })
      return true
    } catch (exception) {
      console.log(exception)
      return false
    }
  }
}

export const createComment = (comment) => {
  return async dispatch => {
    try {
      const newComment = await commentService.create(comment)

      dispatch({
        type: 'ADD_COMMENT',
        data: newComment
      })
      return newComment
    } catch (exception) {
      console.log(exception)
      return false
    }
  }
}

export default commentReducer