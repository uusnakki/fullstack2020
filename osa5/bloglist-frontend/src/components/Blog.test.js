import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'Testi Title',
    author: 'Teppo'
  }
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testi Title',
    'Teppo'
  )
})

test('clicking da button calls event handler agaaaaain', async () => {

  const blog = {
    title: 'Testi Title',
    author: 'Teppo',
    url: 'www.google.com',
    likes: '23',
    user: {
      name: 'Matti Meikäläinen'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} onClick={mockHandler} />
  )

  const button = component.getByText('show more')
  fireEvent.click(button)
  component.debug()

  expect(component.container).toHaveTextContent(
    'Testi Title - Teppo',
    'www.google.com',
    '23',
    'Matti Meikäläinen'
  )
})