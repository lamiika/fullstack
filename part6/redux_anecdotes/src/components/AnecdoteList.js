import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(castVote(anecdote))

    dispatch(setNotification(`You voted: "${anecdote.content}"`, 3))
  }

  return (
    <div>
      {anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      ).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList