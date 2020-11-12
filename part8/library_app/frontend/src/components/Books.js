import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [getBooksByGenre, genreResult] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (!result.loading) {
      setBooks(result.data.allBooks)
      setGenres([ ...new Set( result.data.allBooks.map(b => b.genres).flat() ) ])
    }
  }, [result])

  useEffect(() => {
    if (genreResult.called && !genreResult.loading) {
      setBooks(genreResult.data.allBooks)
    }
  }, [genreResult])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const filterByGenre = (genre) => {
    if (genre) {
      getBooksByGenre({ variables: { genre: genre } })
      setSelectedGenre(genre)
    } else {
      getBooksByGenre()
      setSelectedGenre('all')
    }
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{selectedGenre}</strong></p>
      <BookTable books={books} />
      {genres.map(genre =>
        <button onClick={() => filterByGenre(genre)} key={genre}>{genre}</button>
      )}
      <button onClick={() => filterByGenre()}>all genres</button>
    </div>
  )
}

export default Books