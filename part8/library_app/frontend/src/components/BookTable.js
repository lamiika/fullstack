import React from 'react'

const BookTable = ({ books, genre }) => {
  return (
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
  )
}

export default BookTable