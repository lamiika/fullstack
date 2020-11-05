import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all')

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = [ ...new Set( books.map(b => b.genres).flat() ) ]

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{genre}</strong></p>
      <BookTable books={books} genre={genre} />
      {genres.map(genre =>
        <button onClick={() => setGenre(genre)} key={genre}>{genre}</button>
      )}
      <button onClick={() => setGenre('all')}>all genres</button>
    </div>
  )
}

export default Books