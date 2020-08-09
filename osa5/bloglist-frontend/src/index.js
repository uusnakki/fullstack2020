import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {createStore, combineReducers} from 'redux'
import notificationReducer from './reducers/notificationReducer'
import {Provider} from 'react-redux'

const allReducers = combineReducers({
  notification: notificationReducer
})

const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


ReactDOM.render(
 <Provider store={store}>
    <App />
 </Provider>
, 

document.getElementById('root'))