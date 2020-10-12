const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [ ...state, action.data.message ]
    case 'DELETE_NOTIFICATION':
      return state.slice(1)
    default:
      return state
  }
}

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message }
    })

    setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
      })
    }, duration * 1000)
  }
}

export default notificationReducer