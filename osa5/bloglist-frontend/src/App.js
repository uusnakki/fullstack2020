import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Error from './components/Error'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage('Blog ' + blogObject.title + ' created succesfully!')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Logged in!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setMessage('Bye bye!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
        user={user}
      />
    </Togglable>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <Error message={error} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Awesome blog website</h2>
      <Notification message={message} />
      <Error message={error} />

      {user.name} logged in {logoutForm()}
      {blogForm()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App