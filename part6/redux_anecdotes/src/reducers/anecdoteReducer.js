import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdote, votes: anecdote.votes + 1
      }
      const anecdotes = state.map(a =>
        a.id !== id ? a : changedAnecdote
      )
      return anecdotes.sort((a, b) => b.votes - a.votes)
    case 'CREATE_ANECDOTE':
      return [...state, action.data]
    case 'INITIALIZE_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const castVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'CREATE_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer