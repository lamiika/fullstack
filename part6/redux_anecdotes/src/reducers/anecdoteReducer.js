import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data
      const anecdotes = state.map(a =>
        a.id !== updatedAnecdote.id ? a : updatedAnecdote
      )
      return anecdotes.sort((a, b) => b.votes - a.votes)
    case 'CREATE_ANECDOTE':
      return [...state, action.data]
    case 'INITIALIZE_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

export const castVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer