import React, { useState } from 'react'

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
            <form onSubmit={addBlog}>
                <h2>create new blog</h2>
                <div>
                    title:
        <input
                        value={newTitle}
                        onChange={handleTitleChange}
                    />

                </div>
                <div>
                    author:
        <input
                        value={newAuthor}
                        onChange={handleAuthorChange}
                    />

                </div>
                <div>
                    url:
        <input
                        value={newUrl}
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit" >create</button>
            </form>
        </div>

    )
}

export default BlogForm