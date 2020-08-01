import React, { useState } from 'react'

const Blog = ({ blog, handleDeleteBlog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const like = () => {
    handleLike()
  }
  const deleteStyle = {
    color: 'red',
    backgroundColor: 'black'
  }
  const [more, setMore] = useState(false)

  if (more === false) {
    return (
      <div>
        <p>{blog.title} - {blog.author} <button onClick={() => setMore(true)}>show more</button>
          <button style={deleteStyle} onClick={() => handleDeleteBlog(blog)}>delete</button></p>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <p>{blog.title} - {blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} <button onClick={like}>like</button></p>
      <p>{blog.user.name}</p>
      <button onClick={() => setMore(false)}>show less</button>
      <button style={deleteStyle} onClick={() => handleDeleteBlog(blog)}>delete</button>
    </div>
  )
}

export default Blog
