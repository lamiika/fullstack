const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment
    .find({}).populate('blog', { title: 1, user: 1 })

  response.json(comments.map(comment => comment.toJSON()))
})

commentsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(body.content, body.blog)

  const blog = await Blog.findById(body.blog)

  const comment = new Comment({
    content: body.content,
    blog: blog._id
  })

  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.json(savedComment.toJSON())
})

module.exports = commentsRouter