import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

const RecommendedBooks = ({ show, user }) => {
  const [getBooksByGenre, genreResult] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (user) {
      getBooksByGenre({ variables: { genre: user.favoriteGenre } })
    }
  }, [user])

  useEffect(() => {
    if (genreResult.called && !genreResult.loading) {
      setBooks(genreResult.data.allBooks)
    }
  }, [genreResult])

  if (!show) {
    return null
  }

  if (genreResult.loading || !user) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>
      <BookTable books={books} />
    </div>
  )
}

export default RecommendedBooks