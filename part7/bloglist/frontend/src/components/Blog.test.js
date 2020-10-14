import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog.js'

describe('The component Blog', () => {
  let blog

  beforeEach(() => {
    blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: {
        username: 'mluukkai'
      }
    }
  })

  test('renders only the title and author by default', () => {
    const mockHandler = jest.fn()
    const user = { username: 'mluukkai' }

    const component = render(
      <Blog blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} user={user} />
    )

    const div = component.container.querySelector('.togglableInfoDiv')
    expect(div).toHaveStyle('display: none')
  })

  test('renders the url and the likes once the toggle button has been pressed', () => {
    const mockHandler = jest.fn()
    const user = { username: 'mluukkai' }

    const component = render(
      <Blog blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} user={user} />
    )
    const button = component.container.querySelector('.blogToggleButton')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableInfoDiv')
    expect(div).not.toHaveStyle('display: none')
  })

  test('if the like button is pressed twice, updateBlog is called twice', async () => {
    const promise = Promise.resolve()
    const mockHandler = jest.fn(() => promise)
    const updateBlog = jest.fn(blog => {
      return blog
    })
    const user = { username: 'mluukkai' }

    const component = render(
      <Blog blog={blog} updateBlog={updateBlog} removeBlog={mockHandler} user={user} />
    )
    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)

    await act(() => promise)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })

})