import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => {
  const content = parts.map((item, i) =>
    <Part part={item} key={i}/>
  )

  return (
    <>
      {content}
    </>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, value) => 
                                accumulator + value.exercises, 0)

  return (
    <p>Number of exercises {sum}</p>
  )
}

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))