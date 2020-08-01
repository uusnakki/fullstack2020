import React, { useState } from 'react'

const Blog = ({ blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [more, setMore] = useState(false)

  if (more === false) {
    return (
      <div>
        <p>{blog.title} - {blog.author} <button onClick={() => setMore(true)}>show more</button></p>

      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <p>{blog.title} - {blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} <button>like</button></p>
      <p>{blog.user.name}</p>
      <button onClick={() => setMore(false)}>show less</button>
    </div>
  )
}

export default Blog
