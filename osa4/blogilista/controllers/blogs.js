const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', {username:1, name:1})

  response.json(blogs.map(b => b.toJSON()))

  console.log('show me your secrets, db!')
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try{
    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: ( body.likes === undefined) ? 0 : body.likes,
        user: user._id
    })
  
     
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      
      response.json(savedBlog.toJSON())
    
  } catch (error) {
    next (error)
  }
  
    console.log(body)
    console.log('tietokantaan mars')
})

blogsRouter.delete('/:id', async (request, response) => {
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    
  } catch(exception) {
    next(exception)
  }
  console.log('hei hei')
})

module.exports = blogsRouter
