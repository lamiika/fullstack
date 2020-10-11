const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
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

export default notificationReducer