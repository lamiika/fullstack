const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  jest.setTimeout(30000)
  await Blog.deleteMany()

  await Blog.insertMany(helper.initialBlogs)
})

describe('router', () => {
  test('all blogs are returned', async () => {
    const result = await api.get('/api/blogs')

    expect(result.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the blog id field is "id", not "_id"', async () => {
    const result = await api.get('/api/blogs')

    expect(result.body[0].id).toBeDefined()
  })

  test('the database should return an extra blog when one is added', async () => {
    const newBlog = {
      title: 'bloggar',
      author: 'a bird',
      url: 'blogtastic.com',
      likes: 11
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'bloggar',
      author: 'a bird',
      url: 'blogtastic.com',
      likes: 11
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('bloggar')
  })
})

afterAll(() => {
  mongoose.connection.close()
})