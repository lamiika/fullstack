const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
    case 'DELETE_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeoutId

export const setNotification = (message, duration) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message }
    })

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
      })
    }, duration * 1000)
  }
}

export default notificationReducer