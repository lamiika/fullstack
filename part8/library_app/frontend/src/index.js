import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from 'apollo-link-context'

const authLink = setContext((_, { headers }) => {
  const loggedUserJSON = localStorage.getItem('library-user-token')
  if (loggedUserJSON) {
    const loggedUser = JSON.parse(loggedUserJSON)
    const token = loggedUser.value
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    }
  }
  return { headers }
})

const httpLink = createHttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'))