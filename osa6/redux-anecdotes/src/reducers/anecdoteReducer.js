import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const changedOne = action.data.anecdote
      return state.map(anecdote =>
        anecdote.id !== changedOne.id ? anecdote : changedOne
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}
export const oneVote = (id) => {
  return async dispatch => {
    const oldAnec = await anecdoteService.getOne(id)
    const updatedAnecdote = { ...oldAnec, votes: oldAnec.votes + 1 }
    await anecdoteService.update(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: {anecdote:updatedAnecdote}
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew({content, votes:0})
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer