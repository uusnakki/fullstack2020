const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f1',
    title: 'Jippikaijei',
    author: 'Ed',
    url: 'http://www.google.com',
    likes: 100,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f7',
    title: 'This is not biggest',
    author: 'Auto',
    url: 'http://www.yahoo.com',
    likes: 5,
    __v: 0
  }  
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('pituus', async() =>{
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
})

test('da id must be id', async() =>{
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('i can post stuff', async() => {

  const newBlog = {
    _id: '5a422aa71b54a676234d17f2',
    title: 'This is new blog',
    author: 'Newbie',
    url: 'http://www.helpdeskiscool.com',
    likes: 1,
    __v: 0
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('there is zero likes in blog', async() => {

  const newBlog = {
    _id: '5a422aa71b54a676234d17g4',
    title: 'Mr. Zeros Goodss',
    author: 'Mr. Zero',
    url: 'http://www.top10picks.com',
    __v: 0
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)

  const response = await api.get('/api/blogs')
  expect(response.body[3].likes).toBe(0)
})

test('url and title missing', async() => {

  const newBlog = {
    _id: '5a422aa71b54a676234d17s4',
    author: 'Mr. Nobody',
    likes: 2,
    __v: 0
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)

})

afterAll(() => {
  mongoose.connection.close()
})