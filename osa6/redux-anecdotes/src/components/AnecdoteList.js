import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { oneVote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
  
    const vote = (id, anecdote) => {
      console.log('vote', id)
      dispatch(oneVote(id))
      dispatch(voteNotification(`you voted '${anecdote.content}'`, 5))
    }
  return(
      <div>
    {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList