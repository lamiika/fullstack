import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

const RecommendedBooks = ({ show, user }) => {
  const result = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading || !user) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>
      <BookTable books={books} genre={user.favoriteGenre} />
    </div>
  )
}

export default RecommendedBooks