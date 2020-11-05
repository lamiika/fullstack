import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

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

  const filterByGenre = (genre) => {
    setGenre(genre)
  }
  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{genre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            .filter(book =>
              book.genres.includes(genre) || genre === 'all')
            .map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre =>
        <button onClick={() => filterByGenre(genre)} key={genre}>{genre}</button>
      )}
      <button onClick={() => filterByGenre('all')}>all genres</button>
    </div>
  )
}

export default Books