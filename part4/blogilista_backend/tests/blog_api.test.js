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

test('all blogs are returned', async () => {
  const result = await api.get('/api/blogs')

  expect(result.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})