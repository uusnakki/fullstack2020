import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const good = props.arvostelut[0]
  const neutral = props.arvostelut[1]
  const bad = props.arvostelut[2]
  const all = good + bad + neutral
  const average = (good + bad * -1) / (good + neutral + bad)
  const positive = (good / all) * 100

  if (good === 0 && bad === 0 && neutral === 0) return <p>No feedback given</p>

  return (
    <table>
      <tbody>

        <tr>
          <StatisticLine text="good" value={good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value={neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value={bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value={all} />
        </tr>
        <tr>
          <StatisticLine text="average" value={average} />
        </tr>
        <tr>
          <StatisticLine text="positive" value={positive} />
        </tr>
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  if(props.text === "positive") return <td>{props.text} {props.value}%</td>
  
  else return (
    <td>{props.text} {props.value}</td>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.nimi}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button nimi="good" onClick={() => setGood(good + 1)} />  
      <Button nimi="neutral" onClick={() =>setNeutral(neutral + 1)} />  
      <Button nimi="bad" onClick={() => setBad(bad + 1)} />  
      <h1>statistics</h1>
      <Statistics arvostelut={[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)