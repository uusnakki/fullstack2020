import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm calls onSubmit', async () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('#form')

  fireEvent.change(title, {
    target: { value: 'Aikamatka avaruuteen' }
  })

  fireEvent.change(author, {
    target: { value: 'Neil Armstrong' }
  })

  fireEvent.change(url, {
    target: { value: 'www.nasa.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  console.log(createBlog.mock.calls[0][0].content)
  console.log(createBlog.mock.calls[0][0])
})