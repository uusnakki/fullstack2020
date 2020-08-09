const notificationReducer = (state = { text:null}, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return { text: action.data.text }
  default:
    return state
  }
}

export const setNotification = text => {
  return {
    type: 'SET_NOTIFICATION',
    data: { text }

  }
}

export default notificationReducer
