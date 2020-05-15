import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h2>{props.otsikko}</h2>
      </div>
    )
  }
  const Part = ({ part }) => {
    return (
      <div>
        <p>
          {part.name}: {part.exercises}
        </p>
      </div>
    )
  }
  const Total = ({parts}) => {
    const total = parts.reduce( (s, p) => s + p.exercises, 0 )
    
    return (
      <div>
        <h4>
          total of {total} exercises
        </h4>
      </div>
    )
  }
  const Content = ({course}) => {
    return (
      <div>
        {course.parts.map((part) =>
          <Part key={part.id} part={part} />
        )}
        <Total parts={course.parts}/>
        </div>
    )
  }
  const Course = ({course}) => {
    return (
      <div>
        <Header otsikko={course.name} />
        <Content course={course} />
      </div>
    )
  }

  export default Course