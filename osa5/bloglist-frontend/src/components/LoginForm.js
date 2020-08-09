import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ({setUser}) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      dispatch(setNotification('Logged in succesfully'))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    } catch (exception) {
      dispatch(setNotification('Wrong username or password!'))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  }

  return(
    <form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>
                username </Form.Label>
        <Form.Control
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>
                password
        </Form.Label>
        <Form.Control
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button variant="primary" id="login-button" type="submit">login</Button>
      </Form.Group>
    </form>
  )
}

export default LoginForm