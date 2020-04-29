import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Eniten = ({ points }) => {
  let largest = 0;
  let index = 0;
  for (var i = 0; i < points.length; i++) {
    if (largest < points[i]) {
      largest = points[i]
      index = i
    }
  }

  return (
    <div>
      <p>{anecdotes[index]}</p>
      <p>has {largest} votes</p>

    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  let [points, setPoints] = useState([
    0,
    0,
    0,
    0,
    0,
    0
  ])
  let copy = { ...points }


  const Valitse = () => {
    const valittu = setSelected(Math.floor(Math.random() * anecdotes.length))
    return valittu
  }

  const Plussaa = () => {
    const copy = [...points]
    copy[selected] += 1
    return (
      setPoints(copy)
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]} <br></br> has {copy[selected]} votes
      <br>
      </br>
      <button onClick={Plussaa}>vote</button>
      <button onClick={Valitse}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Eniten points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)