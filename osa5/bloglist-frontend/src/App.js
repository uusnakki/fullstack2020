import React, { useState, useEffect, useRef } from 'react'
import Image from './library.jpg'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Error from './components/Error'
import './index.css'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'


const App = () => {
  const notification = useSelector(state => state.notification.text)
  const error = useSelector(state => state.notification.text)
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)


  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
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
      })
    dispatch(setNotification('Blog ' + blogObject.title + ' created succesfully!'))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setNotification('Bye Bye :)'))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  const handleDeleteBlog = async (blog) => {
    try {
      window.confirm('Do you wish to delete this blog?')
      console.log('testaillaan toimiiko!')
      blogService.setToken(user.token)
      await blogService.destroy(blog.id)
      dispatch(setNotification(`${blog.title} deleted`))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      console.log('toimii!')
    } catch (exception) {
      dispatch(setNotification('Error with delete'))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
        user={user}
      />
    </Togglable>
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
        <Error message={error} />
        <LoginForm setUser={setUser}/>
      </div>
    )
  }

  return (
    <div className="container" style={{ backgroundImage: `url(${Image}`,
      color: 'white',
      fontSize: 18
    }}>
      <h2>Awesome blog website</h2>
      <Notification message={notification} />
      {user.name} logged in
      {logoutForm()}
      {blogForm()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          handleDeleteBlog={handleDeleteBlog}
        />
      )}
    </div>
  )
}

export default App