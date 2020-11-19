import React, { useState, useEffect } from 'react'
import {
  useApolloClient, useSubscription, useMutation, useQuery
} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import RecommendedBooks from './components/RecommendedBooks'
import LoginForm from './components/LoginForm'
import { ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const client = useApolloClient()
  const [notification, setNotification] = useState(null)

  const logout = () => {
    setUser(null)
    localStorage.clear()
    client.resetStore()
    if (page === 'add' || page === 'recommend') {
      setPage('login')
    }
  }

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('library-user-token')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)
      
    const bookDataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(bookDataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : bookDataInStore.allBooks.concat(addedBook)}
      })
    }

    const authorDataInStore = client.readQuery({ query: ALL_AUTHORS })

    if (!includedIn(authorDataInStore.allAuthors, addedBook.author)) {
      console.log('writing')
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: authorDataInStore.allAuthors.concat(addedBook.author) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      setNotification(`New book added: '${addedBook.title}' by ${addedBook.author.name}`)
      updateCacheWith(addedBook)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {user
          ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={logout}>logout</button>
              <span>{' '}logged in as {user.username}</span>
            </>
          : <>
              <button onClick={() => setPage('login')}>login</button>
            </>
        }
      </div>

      <div>
        {notification}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />
      
      <RecommendedBooks
        show={page === 'recommend'}
        user={user}
      />

      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setUser={setUser}
      />

    </div>
  )
}

export default App