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

export const createNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { message },
  }
}

export const deleteNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION'
  }
}

export default notificationReducer