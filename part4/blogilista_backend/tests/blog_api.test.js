const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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

  test('if the field likes is undefined, it\'s value is set to 0', async () => {
    const newBlog = {
      title: 'bloggar',
      author: 'a bird',
      url: 'blogtastic.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title === 'bloggar')

    expect(addedBlog.likes).toBeDefined()
    expect(addedBlog.likes).toBe(0)
  })

  test('if a blog doesn\'t contain a title or url, it\'s rejected', async () => {
    const noTitle = {
      author: 'a bird',
      url: 'blogtastic.com'
    }

    const noUrl = {
      title: 'bloggar',
      author: 'a bird'
    }

    await api
      .post('/api/blogs')
      .send(noTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(noUrl)
      .expect(400)
  })
})

describe('modifying a blog', () => {
  test('succeeds with status code 200 and replaces the contents if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]

    const modifiedContents = {
      ...blogToModify,
      likes: blogToModify.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(modifiedContents)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const modifiedBlog = blogsAtEnd.find(blog => blog.title === modifiedContents.title)

    expect(modifiedBlog.likes).toBe(modifiedContents.likes)
    expect(modifiedBlog).toEqual(modifiedContents)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('creating a user', () => {
  beforeEach(async () => {
    await User.deleteMany()

    const passwordHash = await bcrypt.hash('sekred', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('successful', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('doesn\'t work with a non-unique username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('doesn\'t work with a username below 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const shortUsername = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(shortUsername)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('doesn\'t work with a password below 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const shortPassword = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'sa'
    }

    await api
      .post('/api/users')
      .send(shortPassword)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})