import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, user }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user.id,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog} id="form">
        <h2>create new blog</h2>
        <div>
                    title:
          <input
            id="title"
            value={newTitle}
            onChange={handleTitleChange}
          />

        </div>
        <div>
                  author:
          <input
            id="author"
            value={newAuthor}
            onChange={handleAuthorChange}
          />

        </div>
        <div>
                  url:
          <input
            id="url"
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit" id="create-button" >create</button>
      </form>
    </div>

  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default BlogForm