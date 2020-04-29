import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
       <h1>{props.otsikko}</h1>
    </div>
  )
}
const Part = ({part}) => {
  return (
    <div>
      <p>
      {part.name}: {part.exercises}
      </p>
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
        Number of exercises: {props.kaikkiluvut}
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Header otsikko={props.kurssi.name} />
      <Part part={props.kurssi.parts[0]} />
      <Part part={props.kurssi.parts[1]} />
      <Part part={props.kurssi.parts[2]} />
      <Total kaikkiluvut={props.kurssi.parts[0].exercises + props.kurssi.parts[1].exercises + props.kurssi.parts[2].exercises}/>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Content kurssi={course} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))