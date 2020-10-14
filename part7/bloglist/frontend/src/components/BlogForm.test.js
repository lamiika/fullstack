import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm.js'

test('createBlog is given the correct form information', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'React patterns' }
  })
  fireEvent.change(author, {
    target: { value: 'Michael Chan' }
  })
  fireEvent.change(url, {
    target: { value: 'https://reactpatterns.com/' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/'
  })
})