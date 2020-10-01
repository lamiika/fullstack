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
})

afterAll(() => {
  mongoose.connection.close()
})