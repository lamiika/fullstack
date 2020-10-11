const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data.content
    default:
      return state
  }
}

export const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    data: {
      content
    }
  }
}

export default filterReducer