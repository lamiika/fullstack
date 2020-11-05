import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import RecommendedBooks from './components/RecommendedBooks'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const client = useApolloClient()

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

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
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