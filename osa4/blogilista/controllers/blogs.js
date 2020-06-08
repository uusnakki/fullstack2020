const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    console.log('show me your secrets, db!')
})

blogsRouter.post('/', (request, response) => {
    const body = request.body

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    console.log(body)
    console.log('tietokantaan mars')
})

module.exports = blogsRouter
