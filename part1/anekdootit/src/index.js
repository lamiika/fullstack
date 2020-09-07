import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const Anecdote = ({ text, votes }) => (
  <>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const random = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const updatePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const findMostPoints = () => {
    console.log(points.indexOf(Math.max(...points)))
    return points.indexOf(Math.max(...points))
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <Button text='vote' handleClick={() => updatePoints()} />
      <Button text='next anecdote' handleClick={() => setSelected(random)} />
      <Header text='Anecdote with most votes' />
      <Anecdote text={anecdotes[findMostPoints()]} votes={points[findMostPoints()]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
)
