require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')

app.use(express.json())
app.use(cors())


app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    console.log('show me your secrets, db!')
})

app.post('/api/blogs', (request, response) => {
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

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})