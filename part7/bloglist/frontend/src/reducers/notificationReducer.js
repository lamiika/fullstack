const initialState = {
  message: 'hello',
  style: {
    color: 'blue',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.data.message,
        style: {
          ...state.style,
          color: action.data.color
        }
      }
    case 'CLEAR_NOTIFICATION':
      return {
        message: null,
        style: state.style
      }
    default:
      return state
  }
}

let timeoutId

export const showNotification = (message, color, duration) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, color }
    })

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, duration * 1000)
  }
}

export default notificationReducer